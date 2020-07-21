3340 REM ROOM ONE
"You are out on the battlements of the chateau. There is only one way back"



3380 REM ROOM TWO
"This is an eerie room, where once magicians convorted with evil sprites and werebeasts... Exits lead in three directions An evil smell comes from the south"



3450 REM ROOM THREE
"An old straw mattress lies in one corner...it has been ripped apart to find any treasure which was hidden in it Light comes fitfully from a window to the north, and around the doors to south, east and west"



3530 REM ROOM FOUR
"This wooden-panelled room makes you feel damp and uncomfortable"
3560 IF RND(1)>.5 THEN PRINT "A mouse scampers across the floor" ELSE PRINT "A bat flits across the ceiling"

"There are three doors leading from this room, one made of iron Your sixth sense warns you to choose carefully..."



3620 REM ROOM FIVE
"You ignore your intuition... A Spell of Living Stone, primed to trap the first intruder has been set on you...with your last seconds of life you have time only to feel profound regret..."
3700 SC=50
3710 GOTO DEAD



3720 REM ROOM SIX
"You are in an L-shaped room Heavy parchment lines the walls You can see through an archway to the east...but that is not the only exit from this room"



3790 REM ROOM SEVEN
"There is an archway to the west, leading to an L-shaped room a door leads in the opposite direction"



3840 REM ROOM EIGHT
["This must be the Chateau's main kitchen but any food left here has long rotted away...",
"A door leads to the north, and there is one to the west"]



3920 REM ROOM NINE
["You find yourself in a small, room...which makes you feel claustrophobic...",
"There is a picture of a black dragon painted on the north wall, above the door..."]



3990 REM ROOM TEN
"A stairwell ends in this room, which more of a landing than a real room. The door to the north is made of iron, which has rusted over the centuries..."



4060 REM ROOM ELEVEN
["There is a stone archway to the north, You are in a very long room.",
"Fresh air blows down some stairs and rich red drapes cover the walls...You can see doors to the south and east"]



4170 REM ROOM TWELVE
["You have entered a room filled with swirling, choking smoke.",
"you must leave quickly to remain healthy enough to continue your chosen quest..."]



4240 REM ROOM THIRTEEN
["There is a mirror in the corner you glance at it, and feel suddenly very ill.",
"You realise the looking-glass has been enfused with a Spell of Charisma Reduction...oh dear..."]
4310 CH=CH-1



4330 REM ROOM FOURTEEN
"This room is richly finished, with a white marble floor. Strange footprints lead to the two doors from this room...Dare you follow them?"



4390 REM ROOM FIFTEEN
["You are in a long, long hallway, lined on each side with rich, red drapes...",
"They are parted halfway down the east wall where there is a door"]



4460 REM ROOM SIXTEEN
["Someone has spent a long time painting this room a bright yellow...",
"You remember reading that yellow Is the Ancient Oracle's Color of Warning..."]



4530 REM ROOM SEVENTEEN - START
["As you stumble down the ladder you fall into the room. The ladder crashes down behind you...there is now no way back...",
"A small door leads east from this very cramped room..."]



4610 REM ROOM EIGHTEEN
"You find yourself in a Hall of Mirrors...and see yourself reflected a hundred times or more...Through the bright glare you can make out doors in all directions...You notice the mirrors around the east door are heavily tarnished..."



4710 REM ROOM NINETEEN
"You find yourself in a long corridor"
4730 FOR Z=1 TO 1000:NEXT Z
"Your footsteps echo as you walk"



4760 REM ROOM TWENTY
["You feel as you've been wandering around this chateau for ever... and you begin to despair of ever escaping...",
"Still, you can't get too depressed, but must struggle on. Looking around, you see you are in a room which has a heavy timbered ceiling, and white roughly-finished walls...",
 "There are two doors..."]
4870 FOR Z=1 TO 1000:NEXT Z



4890 REM ROOM TWENTY-ONE
"You are in a small alcove. You look around...but can see nothing in gloom...perhaps if you wait a while your eyes will adjust to the murky dark of this alcove..."
4950 FOR Z=1 TO 2000:NEXT:RETURN



4970 REM ROOM TWENTY-TWO
"A dried-up fountain stands in the center of this courtyard, which once held beautiful flowers...but have long-since died..."



5060 REM ROOM TWENTY-THREE
["The scent of dying flowers fills this brightly-lit room...",
"There are two exits from it.."]



5110 REM ROOM TWENTY-FOUR
"This is a round stone cavern off the side of the alcove to your north..."



5160 REM ROOM TWENTY-FIVE
"You are in an enormous circular room, which looks as if it was used as a games room. Rubble covers the floor, partially blocking the only exit..."



5230 REM ROOM TWENTY-SIX
"Through the dim mustiness of this small potting shed you can see a stairwell..."



5280 REM ROOM TWENTY-SEVEN - START
"You begin this Adventure in a small wood outside the Chateau..."
5310 FOR Z=1 TO 3000:NEXT Z
5320 PRINT:PRINT "While out walking one day, you come across a small, ramshackle shed in the woods. Entering it, you see a hole in one corner...an old ladder leads down from the hole..."



5380 REM ROOM TWENTY-EIGHT - END
"How wonderful! Fresh air, sunlight..."
5400 FOR Z=1 TO 1000:NEXT Z
5410 PRINT:PRINT "Birds are singing...you are free at last...."
5430 PRINT:PRINT
5440 GOTO WIN



5450 REM ROOM TWENTY NINE
"The smell came from bodies rotting in huge traps..."
5480 FOR Z=1 TO 1000:NEXT Z
"One springs shut on you, trapping you forever"
5510 QU=3.5
5520 GOTO DEAD



5530 REM ROOM THIRTY
"You fall into a pit of flames..."
5550 IF RND(1)>.7 THEN 5540
5560 SC=10
5570 QU=3.4
5580 GOTO DEAD



5590 REM ROOM THIRTY-ONE
"Aaaaahhh...you have fallen into"
5610 FOR Z=1 TO 3000:NEXT Z
"a pool of acid...now you know - too late - why the mirrors were so badly tarnished"
5650 SC=20
5660 QU=3
5670 GOTO DEAD



5680 REM ROOM THIRTY-TWO
"It's too bad you chose that exit from the alcove..."
5710 FOR Z=1 TO 2000:NEXT Z
"A giant Funnel-Web Spider leaps on you...and before you can react bites you on the neck...you have 10 seconds to live..."
5760 FOR T= 10 TO 1 STEP -1
TAB(T);T
5780 FOR Z=1 TO 300:NEXT Z
5790 PRINT
5800 NEXT T
5810 SC=3
5820 QU=5
5830 GOTO DEAD



5840 REM ROOM THIRTY-THREE
"A stairwell leads into this room, a poor and common hovel with many doors and exits..."



5920 REM ROOM THIRTY-FOUR
"It is hard to see in this room, and you slip slightly on the uneven, rocky floor..."



5970 REM ROOM THIRTY-FIVE
["Horrors! This room was once the torture chamber of the Chateau.."
,"Skeletons lie on the floor, still with chains around the bones..."]



6030 REM ROOM THIRTY-SIX
"Another room with very unpleasant memories..."
6060 FOR Z=1 TO 1000:NEXT Z
6070 PRINT:PRINT "This foul hole was used as the Chateau dungeon...."



6100 REM ROOM THIRTY-SEVEN
"Oh no, this is a Gargoyle's lair..."
6120 FOR Z=1 TO 1000:NEXT Z
"It has been held prisoner here for three hundred years..."
6150 FOR Z=1 TO 1000:NEXT Z
6160 PRINT:PRINT "In his frenzy he thrashes out at you..."
6170 FOR Z=1 TO 1000:NEXT Z
TAB(12);"and..."
6190 FOR Z=1 TO 1000:NEXT Z
"...breaks your neck!!"
6210 SC=0
6220 QU=3
6230 GOTO DEAD



6240 REM ROOM THIRTY-EIGHT
"This was the Lower Dancing Hall... With doors to the north, the east and to the west, you would seem to be able to flee any danger..."
6290 FOR Z=1 TO 1000:NEXT Z



6310 REM ROOM THIRTY-NINE
"This is a dingy pit at the foot of some extremely dubious-looking stairs. A door leads to the east..."



6360 REM ROOM FORTY
["Doors open to each compass point from the Trophy Room of the Chateau...",
"The heads of strange creatures shot by the ancestral owners are mounted high up on each wall..."]



6430 REM ROOM FORTY-ONE
"You have stumbled on a secret room..."
6450 FOR Z=1 TO 1300:NEXT Z
6460 PRINT:PRINT "Down here, eons ago, the ancient Necromancers of Thorin plied their evil craft...and the remnant of their spells hangs heavy on the air..."



6510 REM ROOM FORTY-TWO
"Cobwebs brush your face as you make your way through the gloom of this room of shadows..."



6560 REM ROOM FORTY-THREE
"This gloomy passage lies at the intersection of three rooms..."



6600 REM ROOM FORTY-FOUR
"You are in the rear turret room, below the extreme western wall of the ancient chateau..."


