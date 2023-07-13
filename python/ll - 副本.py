import geopandas as gpd
import matplotlib.pyplot as plt
from geopy.geocoders import Nominatim

# Load the GeoJSON file
gdf = gpd.read_file("C:/Users/梁智杰/Desktop/新建文件夹/my-projects/public/map/dtsj3/provinces/110000.json")

# Create a geolocator
geolocator = Nominatim(user_agent="myGeocoder")

# For each geometry in the GeoDataFrame
for idx, row in gdf.iterrows():
    # Get the center of the geometry
    center = row['geometry'].centroid

    # Reverse geocode the center to get the place name
    location = geolocator.reverse([center.y, center.x])
    
    # Add the place name to the plot if location is not None
    if location is not None:
        plt.text(center.x, center.y, location.address)
    else:
        plt.text(center.x, center.y, "Unknown location")

# Plot the data
gdf.plot()

# Show the plot
plt.show()
