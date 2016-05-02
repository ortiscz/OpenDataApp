-----Aplikace vizualizující otevřená data------
Tato aplikace je výsledkem jednoho z cílů bakalářské práce Podpora publikace otevřených dat v obcích.
Cílem aplikace je vizualizovat vybrané záznamy datové sady, které byly v předchozí části otevřeny.

---Instalace aplikace---

--Příprava prostředí--
1) v souboru //geojson/uzemi.js nahraďte záznamy území obce Huntířov za území vybrané obce, dodržte formát GeoJSON
Pozn. Území lze získat například použitím aplikace Overpass turbo (http://overpass-turbo.eu/)
2) převeďte požadovanou datovou sadu (sady) do formátu GeoJSON
3) v souboru //js/map.js nahraďte souřadnice počátečního středu mapy (řádek 79), dle souřadnicového systému WGS84 
Pozn. Kromě souřadnic také nastavte požadovanou úroveň přiblížení, která je definována za polem souřadnic
4) v souboru //js/map.js stejné souřadnice doplňte do funkce goHome, resetující pozici mapy (řádek 53)

--Barevné rozlišení typů objektů--

1) vyberte, podle kterého atributu datové sady chcete rozlišovat objekty
2) názvem tohoto attributu nahraďte v souboru //js/map.js 'objekt' (getColor(feature.properties.objekt), řádek 3)
3) v souboru map.js ve funkci getColor (řádek 10) nahraďte objekt == 'kemp' ? 'red' za objekt == 'hodnota_atributu' ? 'barva'

--Definice zóny požadovaných objektů--

Běžný scénář:
Objekty pokrývají pouze část území obce, využijte přiblížení mapy do této oblasti pomocí tlačítka.
- v souboru //js/map.js nahraďte souřadnice středu mapy zóny objektů ve funkci goUbytovani (řádek 57), dle souřadnicového systému WGS84
Pozn. Kromě souřadnic také nastavte požadovanou úroveň přiblížení, která je definována za polem souřadnic

Alternativní scénář:
Objekty pokrývají celé území obce, tlačítko bude skryto.
- v souboru //js/map.js zakomentujte řádky 141 - 151

