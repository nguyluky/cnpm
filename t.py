import enum
import requests
from dataclasses import dataclass
from typing import Optional
import uuid, json


@dataclass
class BusRoute:
    RouteId: int
    RouteNo: str
    RouteName: str


@dataclass
class BusRouteDetail:
    RouteId: int
    RouteNo: str
    RouteName: str
    Color: str
    Type: str
    Distance: int
    Orgs: str
    TimeOfTrip: int
    Headway: str
    OperationTime: str
    NumOfSeats: int
    OutBoundName: str
    InBoundName: str
    OutBoundDescription: str
    InBoundDescription: str
    TotalTrip: str
    Tickets: str


@dataclass
class StopElement:
    StopId: int
    Code: str
    Name: str
    StopType: str
    Zone: str
    AddressNo: str
    Street: str
    SupportDisability: str
    Status: str
    Lng: float
    Lat: float
    Search: str
    Routes: str
    Ward: Optional[str] = None


class Direction(enum.Enum):
    OUTBOUND = 1
    INBOUND = 2


def fetch_all_routes():
    URL_GET_ALL_ROUTES = "http://apicms.ebms.vn/businfo/getallroute"
    response = requests.get(URL_GET_ALL_ROUTES)
    if response.status_code == 200:
        list_routes = response.json()
        return [BusRoute(**route) for route in list_routes]
    else:
        raise Exception(f"Failed to fetch routes: {response.status_code}")


def get_route_by_id(route_id: int):
    URL_GET_ROUTE_BY_ID = f"http://apicms.ebms.vn/businfo/getroutebyid/" + str(route_id)
    response = requests.get(URL_GET_ROUTE_BY_ID)
    if response.status_code == 200:
        route_data = response.json()
        return BusRouteDetail(**route_data)
    else:
        raise Exception(f"Failed to fetch route {route_id}: {response.status_code}")


def get_route_stops(route_id: int, direction: Direction = Direction.OUTBOUND):
    URL_GET_ROUTE_STOPS = (
        f"http://apicms.ebms.vn/businfo/getstopsbyvar/"
        + str(route_id)
        + "/"
        + str(direction.value)
    )
    response = requests.get(URL_GET_ROUTE_STOPS)
    if response.status_code == 200:
        stops_data = response.json()
        return [StopElement(**stop) for stop in stops_data]
    else:
        raise Exception(
            f"Failed to fetch stops for route {route_id}: {response.status_code}"
        )


def get_route_path(route_id: int, direction: Direction = Direction.OUTBOUND):
    URL_GET_ROUTE_PATH = (
        f"http://apicms.ebms.vn/businfo/getpathsbyvar/"
        + str(route_id)
        + "/"
        + str(direction.value)
    )
    response = requests.get(URL_GET_ROUTE_PATH)
    if response.status_code == 200:
        path_data = response.json()
        lats = path_data.get("lat", [])
        lngs = path_data.get("lng", [])
        return list(zip(lngs, lats))
    else:
        raise Exception(
            f"Failed to fetch path for route {route_id}: {response.status_code}"
        )


def encode_polyline(coordinates):
    """
    Encode a list of (lat, lng) tuples into a Google Encoded Polyline string.
    """
    result = []
    prev_lat = 0
    prev_lng = 0

    for lat, lng in coordinates:
        lat = int(round(lat * 1e5))
        lng = int(round(lng * 1e5))

        d_lat = lat - prev_lat
        d_lng = lng - prev_lng

        for value in (d_lat, d_lng):
            value = ~(value << 1) if value < 0 else (value << 1)
            while value >= 0x20:
                result.append(chr((0x20 | (value & 0x1F)) + 63))
                value >>= 5
            result.append(chr(value + 63))

        prev_lat, prev_lng = lat, lng

    return ''.join(result)


def get_all_stop_points():
    routes = fetch_all_routes()
    all_stop_points = []
    set_stop_ids = set()
    all_route_details = []
    map_id = {}
    with open("./db/id_map.json", "r", encoding="utf-8") as f:
        map_id = json.load(f)

    for route in routes:
        route_stops = get_route_stops(route.RouteId, Direction.OUTBOUND)
        route_stops += get_route_stops(route.RouteId, Direction.INBOUND)
        for stop in route_stops:
            if stop.StopId not in set_stop_ids:
                set_stop_ids.add(stop.StopId)
                all_stop_points.append(stop)
                map_id[stop.StopId] = str(uuid.uuid4())

        print(
            f"Processed route {route.RouteNo}, total unique stops so far: {len(all_stop_points)}"
        )

    with open("./db/all_stop_points.sql", "w", encoding="utf-8") as f:
        # Insert into StopPoint (id, name, location, meta) values ('a827467d-8fd8-4bc0-b8c2-da8e652ae162', 'Cao Thắng', '{"latitude": 10.773362, "longitude": 106.67836}', '{"zone": "Quận 10", "ward": "None", "addressNo": "156", "street": "Cao Thắng", "supportDisability": "", "status": "Đang khai thác", "search": "CT 156 CT"}');
        # for stop in all_stop_points:
        #     location = f'{{"latitude": {stop.Lat}, "longitude": {stop.Lng}}}'
        #     meta = f'{{"zone": "{stop.Zone}", "ward": "{stop.Ward or "None"}", "addressNo": "{stop.AddressNo}", "street": "{stop.Street}", "supportDisability": "{stop.SupportDisability}", "status": "{stop.Status}", "search": "{stop.Search}"}}'
        #
        #     line = f"Insert into StopPoint (id, name, location, meta) values ('{
        #         map_id[stop.StopId]
        #     }', '{stop.Name}', '{location}', '{meta}');\n"
        #     f.write(line)

        f.write("INSERT INTO `StopPoint` (`id`, `name`, `location`, `meta`) VALUES\n")

        for i, stop in enumerate(all_stop_points):
            location = f'{{"latitude": {stop.Lat}, "longitude": {stop.Lng}}}'
            meta = f'{{"zone": "{stop.Zone}", "ward": "{stop.Ward or "None"}", "addressNo": "{stop.AddressNo}", "street": "{stop.Street}", "supportDisability": "{stop.SupportDisability}", "status": "{stop.Status}", "search": "{stop.Search}"}}'

            line = f"('{map_id[stop.StopId]}', '{stop.Name.replace('\'', '\'\'')}', '{location}', '{meta.replace('\'', '\'\'')}')"
            if i < len(all_stop_points) - 1:
                line += ",\n"
            f.write(line)

        f.write("ON DUPLICATE KEY UPDATE name = VALUES(name), location = VALUES(location), meta = VALUES(meta); ")


    with open("./db/id_map.json", "w", encoding="utf-8") as f:
        json.dump(map_id, f, ensure_ascii=False, indent=4)


def get_all_route_paths():
    routes = fetch_all_routes()
    route_paths = {}

    for route in routes:
        path_coords = [[],[]]
        path_coords[0] = get_route_path(route.RouteId, Direction.INBOUND)
        path_coords[1] = get_route_path(route.RouteId, Direction.OUTBOUND)
        # độ chính xác cao nhất là 6, nhưng dữ liệu gốc chỉ có 5 chữ số thập phân
        route_paths[route.RouteId] = path_coords
        print(f"Encoded path for route {route.RouteNo}")

    with open("./db/route_paths.json", "w", encoding="utf-8") as f:
        json.dump(route_paths, f, ensure_ascii=False, indent=4)


def get_all_route_details():
    routes = fetch_all_routes()
    all_route_details = []

    for route in routes:
        detail = get_route_by_id(route.RouteId)
        all_route_details.append(detail)
        print(f"Fetched details for route {route.RouteNo}")

    with open("./db/all_route_details.json", "w", encoding="utf-8") as f:
        json.dump(
            [detail.__dict__ for detail in all_route_details],
            f,
            ensure_ascii=False,
            indent=4,
        )


def get_stop_by_route():
    routes = fetch_all_routes()
    route_stops_map = {}

    for route in routes:
        stops1 = get_route_stops(route.RouteId, Direction.OUTBOUND)
        stops2 = get_route_stops(route.RouteId, Direction.INBOUND)


        route_stops_map[route.RouteId] = [
            [stop.StopId for stop in stops1],
            [stop.StopId for stop in stops2]
        ]

        print(f"Fetched stops for route {route.RouteNo}")

    with open("./db/route_stops.json", "w", encoding="utf-8") as f:
        json.dump(route_stops_map, f, ensure_ascii=False, indent=4)


def convert_routes_to_sql():
    map_id = {}
    with open("./db/all_route_details.json", "r", encoding="utf-8") as f:
        route_details = json.load(f)

    def generate_sql_insert(route_data):
        """
        Chuyển đổi dữ liệu JSON của một tuyến xe buýt thành câu lệnh SQL INSERT.
        """

        # 1. Trích xuất và xử lý dữ liệu chính
        route_id = str(route_data.get("RouteId"))
        name = route_data.get("RouteName", "").replace("'", "''")
        try:
            timeOf = route_data.get("TimeOfTrip", "0")
            if "-" in str(timeOf):
                avg_time = sum(int(t) for t in str(timeOf).split("-")) / 2
                estimated_duration = avg_time
            else:
                estimated_duration = int()
        except Exception:
            estimated_duration = 0
            print(
                f"Error parsing TimeOfTrip for RouteId {route_id}: {route_data.get('TimeOfTrip')}"
            )
            print(route_data.get("TimeOfTrip"))

        isActive = "TRUE"  # Mặc định là TRUE dựa trên schema

        # 2. Xử lý startLocation và endLocation (Mặc định là JSON rỗng {})
        start_location = "{}"
        end_location = "{}"

        # 3. Xử lý meta: Sao chép và loại bỏ các trường không mong muốn
        meta_data = route_data.copy()
        keys_to_remove = [
            "RouteId",
            "RouteName",
            "TimeOfTrip",  # Đã đưa ra cột riêng
            "Tickets",
            "TotalTrip",
            "RouteNo",
            "Type",
            "Orgs",
            "NumOfSeats",  # Yêu cầu xóa
            "OutBoundName",
            "InBoundName",
            "OutBoundDescription",
            "InBoundDescription",  # (Tùy chọn) Có thể bạn muốn xóa nếu không dùng
        ]
        for key in keys_to_remove:
            meta_data.pop(key, None)

        # Chuyển meta thành chuỗi JSON
        meta_json = json.dumps(meta_data, ensure_ascii=False).replace("'", "''")

        new_id = str(uuid.uuid4())
        map_id[route_id] = new_id

        # 4. Tạo câu lệnh SQL
        sql = f"""
    INSERT INTO `Route` (`id`, `name`, `estimatedDuration`, `startLocation`, `endLocation`, `isActive`, `meta`)
    VALUES ('{new_id}', '{name}', {estimated_duration}, '{start_location}', '{end_location}', {isActive}, '{meta_json}');
    """
        return sql.strip()

    with open("./db/all_routes.sql", "w", encoding="utf-8") as f:
        for detail in route_details:
            sql_insert = generate_sql_insert(detail)
            f.write(sql_insert + "\n")

    # with open("./db/route_id_map.json", "w", encoding="utf-8") as f:
    #     json.dump(map_id, f, ensure_ascii=False, indent=4)


"""CREATE TABLE `RouteStopPoint` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `routeId` VARCHAR(191) NOT NULL,
  `stopPointId` VARCHAR(191) NOT NULL,
  `sequence` INT NOT NULL, -- Thứ tự điểm dừng trong tuyến
` direction` ENUM('PICKUP', 'DROPOFF') ,
  PRIMARY KEY (`id`),
  CONSTRAINT `RouteStopPoint_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RouteStopPoint_stopPointId_fkey` FOREIGN KEY (`stopPointId`) REFERENCES `StopPoint` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
"""


def map_route_stops_to_sql():
    with open("./db/route_id_map.json", "r", encoding="utf-8") as f:
        route_id_map = json.load(f)

    with open("./db/id_map.json", "r", encoding="utf-8") as f:
        stop_id_map = json.load(f)

    with open("./db/route_stops.json", "r", encoding="utf-8") as f:
        route_stops = json.load(f)

    with open("./db/route_stop_mappings.sql", "w", encoding="utf-8") as f:
        value_lines = []
        f.write("INSERT INTO `RouteStopPoint` (`routeId`, `stopPointId`, `sequence`, `direction`) VALUES\n")
        for route_no, [stop_id_lists1, stop_id_lists2] in route_stops.items():
            # print(stop_id_lists1, stop_id_lists2)
            route_uuid = route_id_map.get(str(route_no))
            if not route_uuid:
                print(f"RouteNo {route_no} not found in route_id_map.")
                continue

            for sequence, stop_id in enumerate(stop_id_lists1, start=1):
                stop_uuid = stop_id_map.get(str(stop_id))
                if not stop_uuid:
                    print(f"StopId {stop_id} not found in stop_id_map.")
                    continue

#                 sql = f"""
# INSERT INTO `RouteStopPoint` (`routeId`, `stopPointId`, `sequence`, `direction`)
# VALUES ('{route_uuid}', '{stop_uuid}', {sequence}, "PICKUP");
# """
#                 f.write(sql.strip() + "\n")
                
                value_line = f"('{route_uuid}', '{stop_uuid}', {sequence}, 'PICKUP')"
                value_lines.append(value_line)

            for sequence, stop_id in enumerate(stop_id_lists2, start=1):
                stop_uuid = stop_id_map.get(str(stop_id))
                if not stop_uuid:
                    print(f"StopId {stop_id} not found in stop_id_map.")
                    continue

#                 sql = f"""
# INSERT INTO `RouteStopPoint` (`routeId`, `stopPointId`, `sequence`, `direction`)
# VALUES ('{route_uuid}', '{stop_uuid}', {sequence}, "DROPOFF");
# """
#                 f.write(sql.strip() + "\n")
                value_line = f"('{route_uuid}', '{stop_uuid}', {sequence}, 'DROPOFF')"
                value_lines.append(value_line)
        f.write(",\n".join(value_lines))
        f.write(";\n")




def escape_sql_string(s: str) -> str:
    """Hàm phụ trợ để thoát các ký tự đặc biệt trong chuỗi SQL."""
    return s.replace("'", "''")
    


def update_route_add_path_to_meta():
    with open("./db/route_paths.json", "r", encoding="utf-8") as f:
        route_paths = json.load(f)

    with open("./db/route_id_map.json", "r", encoding="utf-8") as f:
        route_id_map = json.load(f)

    with open("./db/update_route_paths.sql", "w", encoding="utf-8") as f:
        for route_no, encoded_path in route_paths.items():
            route_uuid = route_id_map.get(str(route_no))
            # encoded_path = encode_polyline(encoded_path)
            if not route_uuid:
                print(f"RouteNo {route_no} not found in route_id_map.")
                continue

            sql = f"""
    UPDATE `Route`
    SET `meta` = JSON_SET(`meta`, '$.encodedPath', '{json.dumps(encoded_path)}')
    WHERE `id` = '{route_uuid}';
    """
            f.write(sql.strip() + "\n")


if __name__ == "__main__":
    # get_all_stop_points()
    # get_all_route_paths()
    # get_all_route_details()
    # get_stop_by_route()
    # convert_routes_to_sql()
    # map_route_stops_to_sql()
    update_route_add_path_to_meta()
