# webshop
Webshop for university project


Usecase:

ProductsPage:
User sieht Liste von Produkten
Warenkorbsymbol oben rechts (zeig Anzahl der ausgewählten Produkte)
Warenkorb onClick -> navigate to WarenKorbPage
ProductDetailPage:
klickt auf Produkt -> neuer Seite öffnet , Produkt mit Beschreibung wird angezeigt, er kann Anzahl und Menge auswaählen
Button ("in den Warenkorb") , onClick -> Produkt wird in Warenkorb gespeichert
WarenKorbPage:
Alle ausgewählten Produkte werden angezeigt mit Menge und Anzahl
unten steht Summe mit Versandkosten (daneben inklusive Versandkosten)
Kaufen Button -> OnCLick -> navigate to CustomerDetailsPage

CustomerDetailsPage:
Formular mit Adressdetails 
Bezahlmethode Dropdownmenü

BestätigenButton
-> navigate to ConfirmationPage

ConfirmationPage:
Danke für ihren Einkauf!
Ok Button -> onClick -> Seite lädt neu und resettet sich 

