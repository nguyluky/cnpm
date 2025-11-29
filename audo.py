import asyncio
import random
from typing import List, Tuple, Dict, Optional
import aiohttp
import math

class BusSimulator:
    def __init__(self, access_token: str, base_url: str = "http://localhost:3000"):
        self.access_token = access_token
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        self.current_trip = None
        self.is_running = False
        
    async def get_today_schedules(self) -> List[Dict]:
        """Lấy lịch trình hôm nay"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(
                    f"{self.base_url}/api/drivers/schedules/today",
                    headers=self.headers
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        return data.get("data", {}).get("data", [])
                    else:
                        print(f"Error getting schedules: {response.status}")
                        return []
            except Exception as e:
                print(f"Exception getting schedules: {e}")
                return []
    
    async def get_trip_detail(self, trip_id: str) -> Optional[Dict]:
        """Lấy chi tiết trip"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(
                    f"{self.base_url}/api/drivers/trip/{trip_id}",
                    headers=self.headers
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        return data.get("data")
                    else:
                        print(f"Error getting trip detail: {response.status}")
                        return None
            except Exception as e:
                print(f"Exception getting trip detail: {e}")
                return None
    
    # Events
    async def start_trip(self, trip_id: str) -> bool:
        """Bắt đầu trip"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.post(
                    f"{self.base_url}/api/drivers/trip/{trip_id}/start",
                    headers=self.headers
                ) as response:
                    if response.status == 200:
                        print(f"✅ Trip {trip_id} started successfully")
                        return True
                    else:
                        print(f"❌ Error starting trip: {response.status}")
                        return False
            except Exception as e:
                print(f"Exception starting trip: {e}")
                return False
    
    async def update_location(self, trip_id: str, latitude: float, longitude: float) -> bool:
        """Cập nhật vị trí hiện tại"""
        async with aiohttp.ClientSession() as session:
            try:
                payload = {
                    "latitude": latitude,
                    "longitude": longitude
                }
                async with session.post(
                    f"{self.base_url}/api/drivers/trip/{trip_id}/location",
                    headers=self.headers,
                    json=payload
                ) as response:
                    if response.status == 200:
                        return True
                    else:
                        print(f"❌ Error updating location: {response.status}")
                        return False
            except Exception as e:
                print(f"Exception updating location: {e}")
                return False
    
    async def arrive_stop(self, trip_id: str, stop_id: str) -> bool:
        """Đến điểm dừng"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.post(
                    f"{self.base_url}/api/drivers/trip/{trip_id}/stoppoint/{stop_id}/arrive",
                    headers=self.headers
                ) as response:
                    if response.status == 200:
                        print(f"🚏 Arrived at stop {stop_id}")
                        return True
                    else:
                        print(f"❌ Error arriving stop: {response.status}")
                        return False
            except Exception as e:
                print(f"Exception arriving stop: {e}")
                return False
    
    async def depart_stop(self, trip_id: str, stop_id: str) -> bool:
        """Rời điểm dừng"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.post(
                    f"{self.base_url}/api/drivers/trip/{trip_id}/stoppoint/{stop_id}/depart",
                    headers=self.headers
                ) as response:
                    if response.status == 200:
                        print(f"🚌 Departed from stop {stop_id}")
                        return True
                    else:
                        print(f"❌ Error departing stop: {response.status}")
                        return False
            except Exception as e:
                print(f"Exception departing stop: {e}")
                return False
    
    async def pickup_student(self, trip_id: str, student_id: str) -> bool:
        """Đón học sinh"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.post(
                    f"{self.base_url}/api/drivers/trip/{trip_id}/students/{student_id}/pickup",
                    headers=self.headers
                ) as response:
                    if response.status == 200:
                        print(f"👦 Picked up student {student_id}")
                        return True
                    else:
                        print(f"❌ Error picking up student: {response.status}")
                        return False
            except Exception as e:
                print(f"Exception picking up student: {e}")
                return False
    
    async def dropoff_student(self, trip_id: str, student_id: str) -> bool:
        """Trả học sinh"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.post(
                    f"{self.base_url}/api/drivers/trip/{trip_id}/students/{student_id}/dropoff",
                    headers=self.headers
                ) as response:
                    if response.status == 200:
                        print(f"👦 Dropped off student {student_id}")
                        return True
                    else:
                        print(f"❌ Error dropping off student: {response.status}")
                        return False
            except Exception as e:
                print(f"Exception dropping off student: {e}")
                return False
    
    async def end_trip(self, trip_id: str) -> bool:
        """Kết thúc trip"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(
                    f"{self.base_url}/api/drivers/trip/{trip_id}/end",
                    headers=self.headers
                ) as response:
                    if response.status == 200:
                        print(f"🏁 Trip {trip_id} completed successfully")
                        return True
                    else:
                        print(f"❌ Error ending trip: {response.status}")
                        return False
            except Exception as e:
                print(f"Exception ending trip: {e}")
                return False
    
    # realtime tracking information
    def calculate_distance(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Tính khoảng cách giữa 2 điểm (km)"""
        R = 6371  # Bán kính Trái Đất (km)
        
        lat1_rad = math.radians(lat1)
        lat2_rad = math.radians(lat2)
        delta_lat = math.radians(lat2 - lat1)
        delta_lon = math.radians(lon2 - lon1)
        
        a = (math.sin(delta_lat / 2) ** 2 + 
             math.cos(lat1_rad) * math.cos(lat2_rad) * 
             math.sin(delta_lon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        
        return R * c
    
    def is_near_stop(self, current_pos: Tuple[float, float], stop_pos: Tuple[float, float], threshold: float = 0.05) -> bool:
        """Kiểm tra có gần điểm dừng không (threshold = 50m)"""
        distance = self.calculate_distance(current_pos[1], current_pos[0], stop_pos[1], stop_pos[0])
        return distance < threshold
    
    # simulation 
    async def simulate_student_actions(self, trip_id: str, trip_type: str): # should be deleted and use real student this time
        """Giả lập việc đón/trả học sinh"""
        # Giả lập có 2-5 học sinh mỗi chuyến
        student_count = random.randint(2, 5)
        students = [f"student_{i}_{random.randint(1000, 9999)}" for i in range(student_count)]
        
        for student_id in students:
            if trip_type == "DISPATH":  # Chuyến đi - đón học sinh
                await self.pickup_student(trip_id, student_id)
            else:  # Chuyến về - trả học sinh
                await self.dropoff_student(trip_id, student_id)
            
            # Thời gian giữa các học sinh
            await asyncio.sleep(random.uniform(2, 5))
    
    async def simulate_trip(self, trip_data: Dict):
        """Giả lập một chuyến đi hoàn chỉnh"""
        trip_id = trip_data["id"]
        route = trip_data.get("rotute") or trip_data.get("route")  # Handle typo
        stops = trip_data.get("stops", [])
        
        if not route or not route.get("path"):
            print(f"❌ No route path found for trip {trip_id}")
            return
        
        path = route["path"]  # List[Tuple[longitude, latitude]]
        
        print(f"🚌 Starting simulation for trip {trip_id}")
        print(f"📍 Route: {route['name']}")
        print(f"🛣️  Path points: {len(path)}")
        print(f"🚏 Stops: {len(stops)}")
        
        # Bắt đầu trip
        if not await self.start_trip(trip_id):
            return
        
        # Sắp xếp stops theo sequence
        stops_sorted = sorted(stops, key=lambda x: x.get("sequence", 0))
        
        # Di chuyển theo path
        current_stop_index = 0
        
        for i, point in enumerate(path):
            longitude, latitude = point
            
            # Cập nhật vị trí
            await self.update_location(trip_id, latitude, longitude)
            print(f"📍 Location updated: [{latitude:.6f}, {longitude:.6f}] ({i+1}/{len(path)})")
            
            # Kiểm tra có gần điểm dừng nào không
            if current_stop_index < len(stops_sorted):
                current_stop = stops_sorted[current_stop_index]
                stop_location = current_stop["location"]  # [longitude, latitude]
                
                if self.is_near_stop((longitude, latitude), stop_location):
                    print(f"🚏 Approaching stop: {current_stop['name']}")
                    
                    # Đến điểm dừng
                    await self.arrive_stop(trip_id, current_stop["id"])
                    
                    # Dừng lại 30-60 giây
                    stop_duration = random.uniform(30, 60)
                    print(f"⏱️  Stopping for {stop_duration:.1f} seconds...")
                    
                    # Giả lập đón/trả học sinh
                    schedule_type = "DISPATH" if random.choice([True, False]) else "RETURN"
                    await self.simulate_student_actions(trip_id, schedule_type)
                    
                    await asyncio.sleep(stop_duration)
                    
                    # Rời điểm dừng
                    await self.depart_stop(trip_id, current_stop["id"])
                    
                    current_stop_index += 1
            
            # Thời gian di chuyển giữa các điểm (3-8 giây)
            travel_time = random.uniform(3, 8)
            await asyncio.sleep(travel_time)
        
        # Kết thúc trip
        await self.end_trip(trip_id)
        print(f"✅ Trip {trip_id} simulation completed!")
    
    async def run_continuous_simulation(self):
        """Chạy simulation liên tục"""
        self.is_running = True
        print("🚌 Bus Simulator started!")
        
        while self.is_running:
            try:
                # Lấy lịch trình hôm nay
                schedules = await self.get_today_schedules()
                
                if not schedules:
                    print("📅 No schedules found for today. Waiting 60 seconds...")
                    await asyncio.sleep(60)
                    continue
                
                print(f"📅 Found {len(schedules)} schedules today")
                
                # Chọn trip để simulation
                for schedule in schedules:
                    trip_id = schedule.get("tripId")
                    status = schedule.get("static", "").upper()
                    trip_type = schedule.get("type", "")
                    start_time = schedule.get("startTime", "")
                    
                    print(f"🔍 Checking trip {trip_id} - Status: {status}, Type: {trip_type}")
                    
                    # Chỉ simulation các trip đang PLANNED hoặc ONGOING
                    if status in ["PLANNED", "ONGOING"]:
                        trip_detail = await self.get_trip_detail(trip_id)
                        
                        if trip_detail:
                            print(f"🎯 Selected trip {trip_id} for simulation")
                            await self.simulate_trip(trip_detail)
                            
                            # Nghỉ 5 phút giữa các trip
                            print("⏸️  Waiting 5 minutes before next trip...")
                            await asyncio.sleep(300)
                            break
                    else:
                        print(f"⏭️  Skipping trip {trip_id} - Status: {status}")
                
                # Nếu không có trip nào phù hợp, chờ 2 phút
                print("⏱️  No suitable trips found. Waiting 2 minutes...")
                await asyncio.sleep(120)
                
            except KeyboardInterrupt:
                print("\n🛑 Simulation stopped by user")
                break
            except Exception as e:
                print(f"❌ Error in simulation loop: {e}")
                await asyncio.sleep(30)
        
        self.is_running = False
        print("🔴 Bus Simulator stopped!")
    
    def stop(self):
        """Dừng simulation"""
        self.is_running = False


# Hàm chạy simulation với nhiều token
async def run_multiple_simulators(tokens: List[str], base_url: str = "http://localhost:3000"):
    """Chạy nhiều simulator cùng lúc với các token khác nhau"""
    
    simulators = [BusSimulator(token, base_url) for token in tokens]
    
    # Chạy tất cả simulator song song
    tasks = []
    for i, simulator in enumerate(simulators):
        print(f"🚌 Starting simulator {i+1} with token: {simulator.access_token[:20]}...")
        task = asyncio.create_task(simulator.run_continuous_simulation())
        tasks.append(task)
        
        # Stagger start time để tránh conflict
        await asyncio.sleep(10)
    
    try:
        # Chờ tất cả tasks hoàn thành
        await asyncio.gather(*tasks)
    except KeyboardInterrupt:
        print("\n🛑 Stopping all simulators...")
        for simulator in simulators:
            simulator.stop()


# Main execution
if __name__ == "__main__":
    # Danh sách access tokens của các driver
    ACCESS_TOKENS = [
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example1",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example2",
        # Thêm các token thực tế ở đây
    ]
    
    # Base URL của API server
    BASE_URL = "http://localhost:3000"
    
    if not ACCESS_TOKENS or ACCESS_TOKENS[0].endswith("example1"):
        print("⚠️  Please update ACCESS_TOKENS with real tokens!")
        print("📝 Edit the ACCESS_TOKENS list in the script")
        exit(1)
    
    print("🚌 Bus Route Simulator")
    print("=" * 50)
    print(f"🔗 API Server: {BASE_URL}")
    print(f"👥 Drivers: {len(ACCESS_TOKENS)}")
    print("=" * 50)
    
    try:
        # Chạy simulation
        asyncio.run(run_multiple_simulators(ACCESS_TOKENS, BASE_URL))
    except KeyboardInterrupt:
        print("\n👋 Goodbye!")