import csv
import json

if __name__ == '__main__':

    worlds = json.load(open('3025.json'))

    reader = csv.DictReader(open('affils.csv'))
    owner_data = {}
    for entry in reader:
        owner_data[entry['Planet']] = entry

    for world in worlds:
        if world['name'] in owner_data:
            world['affiliation'] = owner_data[world['name']]['State']
            #world['objects'] = world['objects'].append(owner_data[world['name']]['type'])
            world['type'] = owner_data[world['name']]['Type']
        else:
            if world['affiliation'] not in ['No record', 'Hidden system']:
                world['affiliation'] = 'Independent world'
            world['type'] = 'Minor'

    json.dump(worlds, open("output.json", "w"))
