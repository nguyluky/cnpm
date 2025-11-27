import { exec, spawn } from 'child_process';
import 'reflect-metadata';
import * as ts from 'typescript';
import { promisify } from 'util';
import { addErrorMap, addReflectErrorForClass, addReflectMetadataImport } from './transformer';

const execAsync = promisify(exec);

function createWatchAndRun() {
    const configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
    if (!configPath) throw new Error('Could not find tsconfig.json');

    // Create default watch compiler host
    const host = ts.createWatchCompilerHost(
        configPath,
        {},
        ts.sys,
        ts.createSemanticDiagnosticsBuilderProgram,
        reportDiagnostic,
        reportStatus
    );

    // --- PATCH HERE ---
    const origCreateProgram = host.createProgram;
    host.createProgram = (
        rootNames,
        options,
        hostArg,
        oldProgram
    ) => {
        const program = origCreateProgram(rootNames, options, hostArg, oldProgram);
        const origEmit = program.emit;

        // Monkey-patch emit to inject transformers
        program.emit = (
            targetSourceFile,
            writeFile,
            cancellationToken,
            emitOnlyDtsFiles,
            customTransformers
        ) => {
            const transformers = customTransformers || {};
            const before = [
                ...(transformers.before || []),
                addReflectErrorForClass(),
                addReflectMetadataImport,
                addErrorMap(),
            ];
            return origEmit.call(program, targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, {
                before,
                after: transformers.after,
                afterDeclarations: transformers.afterDeclarations,
            });
        };

        return program;
    };
    // --- END PATCH ---

    let runningProcess: ReturnType<typeof spawn> | null = null;

    const origAfterProgramCreate = host.afterProgramCreate!;
    host.afterProgramCreate = builder => {
        const program = builder.getProgram();

        const compilerOptions = program.getCompilerOptions();
        const outDir = compilerOptions.outDir || 'dist';
        const entryPoint = 'dist/src/index.js';

        async function runTscAliasAndOutput() {
            if (runningProcess) {
                runningProcess.kill();
                runningProcess = null;
            }

            try {
                console.log('Running tsc-alias...');
                await new Promise(resolve => setTimeout(resolve, 500)); // wait a bit for file system
                await execAsync('npx tsc-alias');
                await new Promise(resolve => setTimeout(resolve, 500)); // wait a bit for file system
                console.log('tsc-alias completed.');

                if (ts.sys.fileExists(entryPoint)) {
                    console.log(`Running ${entryPoint}...`);
                    runningProcess = spawn('node', [entryPoint], { stdio: 'inherit' });
                    runningProcess.on('close', code => {
                        console.log(`Process exited with code ${code}`);
                        runningProcess = null;
                    });
                } else {
                    console.warn(`Output file ${entryPoint} not found.`);
                }
            } catch (error) {
                console.error('Error during tsc-alias or running output:', error);
            }
        }

        const allDiagnostics = ts.getPreEmitDiagnostics(program);
        if (allDiagnostics.length === 0) {
            runTscAliasAndOutput().catch(err => console.error('Run failed:', err));
        } else {
            console.log('Compilation errors detected. Skipping execution.');
        }

        origAfterProgramCreate(builder);
    };

    ts.createWatchProgram(host);
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
    console.error(ts.formatDiagnosticsWithColorAndContext([diagnostic], {
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getCanonicalFileName: f => f,
        getNewLine: () => '\n',
    }));
}

function reportStatus(diagnostic: ts.Diagnostic) {
    console.info(ts.formatDiagnosticsWithColorAndContext([diagnostic], {
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getCanonicalFileName: f => f,
        getNewLine: () => '\n',
    }));
}

createWatchAndRun();

