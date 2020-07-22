# Chateau Gaillard

TS/React port of the "Chateau Gaillard" listing from Tim Hartnell's 1983 book "Creating Adventure Games On Your Computer".

Original BASIC source taken from [https://www.atariarchives.org/adventure/chapter22.php]

I should note that the original listing is buggy in several ways:

1. The OCR used to read the listing inserted a few syntax errors.
2. A lot of the indexing seems erroneous. Sometimes he uses indicies in your inventory to index into the global item array, which aren't compatible. So for example when the Dwarf takes items from your inventory, it'll list the wrong item most of the time.
3. The map doesn't make a ton of sense to begin with. The Dwarf appears long before you can find the amulet he wants. 
4. Combat is a problem. There's a whole bunch of code used to select your current weapon, and then it discards your selection and just uses stats instead. So what's the point of even having a weapon? Who knows. 

For version 2.0 I will alter the game to go beyond the original scope, fixing the bigger conceptual problems, maybe expanding the map.
