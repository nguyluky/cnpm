
 # from this


  # {
  #   "StopId": 93,
  #   "Code": "Q10 089",
  #   "Name": "Cao Thắng",
  #   "StopType": "Trụ dừng",
  #   "Zone": "Quận 10",
  #   "Ward": null,
  #   "AddressNo": "156",
  #   "Street": "Cao Thắng",
  #   "SupportDisability": "",
  #   "Status": "Đang khai thác",
  #   "Lng": 106.67836,
  #   "Lat": 10.773362,
  #   "Search": "CT 156 CT",
  #   "Routes": "156D"
  # },


    # to this

# {
#     "name": "string",
#     "location": {
#         "latitude": 0,
#         "longitude": 0
#     },
#     "meta": {
#         "zone": "string",
#         "ward": "string",
#         "addressNo": "string",
#         "street": "string",
#         "supportDisability": "string",
#         "status": "string",
#         "search": "string"
#     }
# }
#

import json
import uuid

data = json.load(open('./db/stopPoint.json', 'r', encoding='utf-8'))

for item in data:
     print(f'Insert into StopPoint (id, name, location, meta) values (\'{str(uuid.uuid4())}\', \'{item["Name"]}\', \'{{"latitude": {item["Lat"]}, "longitude": {item["Lng"]}}}\', \'{{"zone": "{item["Zone"]}", "ward": "{item["Ward"]}", "addressNo": "{item["AddressNo"]}", "street": "{item["Street"]}", "supportDisability": "{item["SupportDisability"]}", "status": "{item["Status"]}", "search": "{item["Search"]}"}}\');', file=open('./db/stopPoint.sql', 'a', encoding='utf-8'))
