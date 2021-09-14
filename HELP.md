### DEVNOTES

#### !!!!! DOWNLOAD https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf THIS! 

Ez kell cors miatt és csak ha ez aktiválva van akkor fog jól működni jelenleg dupla localhoston az oldal.

Spring server indítása után automatikusan csinálunk egy "test@user.com" jelszó: "testuser" accountot, ezzel belehet logolni
a "localhost:3000/login" routon jelenleg. Pár route és fetch elérhető login nélkül, de ha csinálsz egy új backend routeot akkor vagy add hozzá a kivételek közé 
WebConfig-ban vagy küld el a localStorage-ben található jwt token úgy ahogy a recept keresős fetcheknél elvan küldve. Ezzel validálja a requestet spring security és védettek a backend routjeaink. Persze ehhez be kell ,hogy legyél jelentkezve. 