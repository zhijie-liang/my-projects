//.kml转换成.geojson


const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const toGeoJSON = require('@mapbox/togeojson');

function kmlToGeoJSON(kmlPath, outputGeoJSONPath) {
    // 读取KML文件
    const kml = new DOMParser().parseFromString(fs.readFileSync(kmlPath, 'utf8'));

    // 将KML转换为GeoJSON
    const converted = toGeoJSON.kml(kml);

    // 将GeoJSON写入文件
    fs.writeFileSync(outputGeoJSONPath, JSON.stringify(converted, null, 4));
}

function batchConvertKMLtoGeoJSON(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        if (file.endsWith('.kml')) {
            const kmlPath = `${directory}/${file}`;
            const geoJSONPath = `${directory}/${file.replace('.kml', '.geojson')}`;
            kmlToGeoJSON(kmlPath, geoJSONPath);
        }
    }
}

// 示例：将"myDirectory"文件夹中的所有.kml文件转换为.geojson
batchConvertKMLtoGeoJSON('D:/梁智杰/BMDownload/贵州/总kml');
