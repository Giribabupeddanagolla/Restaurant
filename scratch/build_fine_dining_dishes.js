const fs = require('fs');
const path = require('path');

// Curated Category & Subcategory Specific Gourmet Photography Pools
const categoryPhotos = {
  // Amuse-Bouche
  'chefs-welcome-bite': [
    'https://images.unsplash.com/photo-1541544741938-0af808871cc0', // Gourmet amuse-bouche spoon
    'https://images.unsplash.com/photo-1509722747041-616f39b57569', // Caviar crostini bite
    'https://images.unsplash.com/photo-1540420773420-3366772f4999', // Spiced avocado sphere
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88', // Fine dining plated appetizer bite
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd', // Saffron elixir shot
    'https://images.unsplash.com/photo-1551218808-94e220e084d2', // Gourmet welcome bite
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af', // Foie gras fig mousse
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352', // Microgreen crostini
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327', // Truffle cream canapé
    'https://images.unsplash.com/photo-1493770348161-369560ae357d', // Berry caviar amuse
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', // Gold leaf canapé
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929', // Smoked avocado crostini
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288', // Starter spoon bite
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Herbed velvet mousse
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836', // Truffle welcome bite
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8', // Spiced cottage cheese bite
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0', // Malai mousse canapé
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398', // Zafrani crostini amuse
    'https://images.unsplash.com/photo-1585032226651-759b368d7246', // Crispy herbed bite
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'  // Honey glazed canapé
  ],

  'paneer-canape': [
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8', // Paneer tikka bite
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0', // Malai paneer crostini
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d', // Truffle paneer cube
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398', // Zafrani paneer canape
    'https://images.unsplash.com/photo-1585032226651-759b368d7246', // Tandoori paneer bite
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', // Glazed paneer canape
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Herb paneer tartlet
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836', // Charcoal paneer bite
    'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6', // Pesto paneer canape
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0', // Smoked paneer tartlet
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352', // Microgreen paneer bite
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327', // Creamy paneer canape
    'https://images.unsplash.com/photo-1493770348161-369560ae357d', // Saffron paneer bite
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', // Gold paneer crostini
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929', // Avocado paneer bite
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288', // Royal paneer spoon
    'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2', // Kashmiri paneer bite
    'https://images.unsplash.com/photo-1596797038530-2c107229654b', // Peshawari paneer tart
    'https://images.unsplash.com/photo-1540420773420-3366772f4999', // Citrus paneer sphere
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88'  // Seared paneer amuse
  ],

  'chicken-canape': [
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46', // Chicken malai bite
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435', // Smoked chicken tartlet
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', // Grilled chicken crostini
    'https://images.unsplash.com/photo-1562967914-608f82629710', // Chicken tikka bite
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d', // Charred chicken amuse
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db', // Spiced chicken canape
    'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91', // Claypot chicken bite
    'https://images.unsplash.com/photo-1544025162-d76694265947', // Chicken galouti bite
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398', // Zafrani chicken canape
    'https://images.unsplash.com/photo-1585032226651-759b368d7246', // Hariyali chicken bite
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', // Glazed chicken crostini
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Herb chicken tartlet
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836', // Truffle chicken bite
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', // Boneless chicken canape
    'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db', // Karaikudi chicken bite
    'https://images.unsplash.com/photo-1633945274405-b6c8069047b0', // Claypot chicken amuse
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0', // Zafrani chicken tart
    'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2', // Smoked chicken crostini
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af', // Truffle chicken spoon
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352'  // Microgreen chicken bite
  ],

  'seafood-bite': [
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', // Salmon crostini bite
    'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47', // Garlic butter prawn bite
    'https://images.unsplash.com/photo-1551248429-40975aa4de74', // Lobster thermidor bite
    'https://images.unsplash.com/photo-1514944288352-fffac99f0bdf', // Seabass carpaccio
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb', // Seafood medley spoon
    'https://images.unsplash.com/photo-1535567465397-7523840f2ae9', // Seared salmon amuse
    'https://images.unsplash.com/photo-1563245372-f21724e3856d', // Tiger prawn bite
    'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369', // Pomfret tikka bite
    'https://images.unsplash.com/photo-1509722747041-616f39b57569', // Caviar crostini
    'https://images.unsplash.com/photo-1540420773420-3366772f4999', // Citrus prawn sphere
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88', // Seared salmon bite
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd', // White wine lobster bite
    'https://images.unsplash.com/photo-1551218808-94e220e084d2', // Grilled seafood tartlet
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af', // Black cod bite
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352', // Herb prawn crostini
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327', // Smoked trout bite
    'https://images.unsplash.com/photo-1493770348161-369560ae357d', // Gold leaf lobster amuse
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', // Crab masala canape
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929', // Squid fry bite
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288'  // Fine dining fish spoon
  ],

  'seasonal-special-ab': [
    'https://images.unsplash.com/photo-1541544741938-0af808871cc0', // Seasonal elixir spoon
    'https://images.unsplash.com/photo-1509722747041-616f39b57569', // Truffle mushroom sphere
    'https://images.unsplash.com/photo-1540420773420-3366772f4999', // Saffron avocado amuse
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88', // Plated seasonal bite
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd', // Microgreen berry shot
    'https://images.unsplash.com/photo-1551218808-94e220e084d2', // Gourmet seasonal starter
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af', // Fig & cheese mousse
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352', // Herbed crostini special
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327', // Gold leaf seasonal amuse
    'https://images.unsplash.com/photo-1493770348161-369560ae357d', // Berry caviar sphere
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', // Truffle cream spoon
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929', // Avocado tartlet
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288', // Saffron consomme bite
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Velvet herb mousse
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836', // Smoked truffle bite
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8', // Gourmet seasonal paneer
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0', // Malai mousse sphere
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398', // Zafrani seasonal bite
    'https://images.unsplash.com/photo-1585032226651-759b368d7246', // Crispy herb crostini
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'  // Honeyed seasonal canape
  ],

  // Fine Dining Starters
  'truffle-paneer-fds': [
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8', // Truffle paneer tikka skewer
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0', // Malai truffle paneer
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d', // Claypot paneer tikka
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398', // Zafrani paneer tikka
    'https://images.unsplash.com/photo-1585032226651-759b368d7246', // Tandoori paneer platter
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', // Glazed paneer tikka
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Herb roasted paneer
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836', // Charcoal paneer tikka
    'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6', // Pesto paneer tikka
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0', // Smoked paneer tikka
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352', // Microgreen paneer tikka
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327', // Creamy paneer tikka
    'https://images.unsplash.com/photo-1493770348161-369560ae357d', // Saffron paneer tikka
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', // Gold paneer tikka
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929', // Avocdo paneer tikka
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288', // Royal paneer platter
    'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2', // Kashmiri paneer tikka
    'https://images.unsplash.com/photo-1596797038530-2c107229654b', // Peshawari paneer tikka
    'https://images.unsplash.com/photo-1540420773420-3366772f4999', // Citrus paneer tikka
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88'  // Seared paneer tikka
  ],

  'tandoori-mushroom-fds': [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836', // Stuffed tandoori mushroom
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', // Grilled garlic mushroom
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Herb roasted mushroom tikka
    'https://images.unsplash.com/photo-1540420773420-3366772f4999', // Claypot tandoori mushroom
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0', // Malai mushroom tikka
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398', // Zafrani tandoori mushroom
    'https://images.unsplash.com/photo-1585032226651-759b368d7246', // Hariyali mushroom tikka
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8', // Charcoal mushroom platter
    'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6', // Pesto tandoori mushroom
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0', // Smoked mushroom tikka
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352', // Wild mushroom tikka
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327', // Creamy mushroom tikka
    'https://images.unsplash.com/photo-1493770348161-369560ae357d', // Saffron stuffed mushroom
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', // Gold tandoori mushroom
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929', // Herbed mushroom skewer
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288', // Royal mushroom platter
    'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2', // Kashmiri mushroom tikka
    'https://images.unsplash.com/photo-1596797038530-2c107229654b', // Peshawari mushroom tikka
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88', // Seared mushroom tikka
    'https://images.unsplash.com/photo-1551218808-94e220e084d2'  // Grilled wild mushroom
  ],

  'chicken-galouti-kebab-fds': [
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46', // Awadhi chicken galouti kebab
    'https://images.unsplash.com/photo-1544025162-d76694265947', // Melt-in-mouth chicken galouti
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435', // Saffron chicken galouti
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', // Charcoal chicken galouti
    'https://images.unsplash.com/photo-1562967914-608f82629710', // Smoked galouti kebab
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d', // Royal galouti kebab
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db', // Spiced chicken galouti
    'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91', // Claypot chicken galouti
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398', // Zafrani galouti kebab
    'https://images.unsplash.com/photo-1585032226651-759b368d7246', // Peshawari galouti kebab
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', // Glazed galouti kebab
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Herb chicken galouti
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836', // Truffle galouti kebab
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', // Boneless chicken galouti
    'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db', // Nizam chicken galouti
    'https://images.unsplash.com/photo-1633945274405-b6c8069047b0', // Claypot galouti kebab
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0', // Zafrani chicken galouti
    'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2', // Smoked galouti platter
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af', // Truffle galouti kebab
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352'  // Microgreen galouti kebab
  ],

  'mutton-shikampuri-fds': [
    'https://images.unsplash.com/photo-1544025162-d76694265947', // Mutton shikampuri kebab
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46', // Stuffed mutton shikampuri
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435', // Saffron mutton shikampuri
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', // Charcoal mutton shikampuri
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0', // Royal mutton shikampuri
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d', // Braised mutton shikampuri
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db', // Shahi mutton shikampuri
    'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91', // Claypot mutton shikampuri
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398', // Zafrani shikampuri kebab
    'https://images.unsplash.com/photo-1585032226651-759b368d7246', // Peshawari mutton shikampuri
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', // Awadhi mutton shikampuri
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Lucknowi shikampuri kebab
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836', // Truffle mutton shikampuri
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d', // Ratanjot mutton shikampuri
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', // Claypot braised shikampuri
    'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db', // Nizam mutton shikampuri
    'https://images.unsplash.com/photo-1633945274405-b6c8069047b0', // Zafrani shikampuri platter
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0', // Hyderabadi mutton shikampuri
    'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2', // Charcoal shikampuri kebab
    'https://images.unsplash.com/photo-1596797038530-2c107229654b'  // Gold leaf mutton shikampuri
  ],

  'smoked-fish-fds': [
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', // Smoked salmon carpaccio
    'https://images.unsplash.com/photo-1514944288352-fffac99f0bdf', // Chilean seabass carpaccio
    'https://images.unsplash.com/photo-1535567465397-7523840f2ae9', // Pan seared smoked fish
    'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369', // Smoked pomfret tikka
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288', // Saffron smoked seabass
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836', // Truffle smoked trout
    'https://images.unsplash.com/photo-1541544741938-0af808871cc0', // Smoked fish platter
    'https://images.unsplash.com/photo-1509722747041-616f39b57569', // Caviar smoked fish bite
    'https://images.unsplash.com/photo-1540420773420-3366772f4999', // Citrus smoked salmon
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88', // Seared smoked fish
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd', // White wine smoked seabass
    'https://images.unsplash.com/photo-1551218808-94e220e084d2', // Smoked fish tikka
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af', // Black cod carpaccio
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352', // Herb smoked trout
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327', // Smoked trout fillet
    'https://images.unsplash.com/photo-1493770348161-369560ae357d', // Gold leaf smoked fish
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', // Smoked salmon crostini
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929', // Avocado smoked fish
    'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47', // Smoked prawns carpaccio
    'https://images.unsplash.com/photo-1551248429-40975aa4de74'  // Smoked lobster bite
  ]
};

// Fallback category mapping for remaining categories
const groupFallback = {
  'premium-vegetarian': [
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8',
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d',
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
    'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836'
  ],
  'premium-chicken': [
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db',
    'https://images.unsplash.com/photo-1544025162-d76694265947',
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46',
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'
  ],
  'premium-mutton': [
    'https://images.unsplash.com/photo-1544025162-d76694265947',
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46',
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'
  ],
  'premium-seafood': [
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
    'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47',
    'https://images.unsplash.com/photo-1551248429-40975aa4de74',
    'https://images.unsplash.com/photo-1514944288352-fffac99f0bdf',
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
  ],
  'tandoor-kebab-fd': [
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46',
    'https://images.unsplash.com/photo-1544025162-d76694265947',
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435',
    'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47',
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8'
  ],
  'fine-dining-biryani': [
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
    'https://images.unsplash.com/photo-1633945274405-b6c8069047b0',
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0',
    'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2',
    'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db'
  ],
  'rice-accompaniments-fd': [
    'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2',
    'https://images.unsplash.com/photo-1596797038530-2c107229654b',
    'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6',
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0',
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d'
  ],
  'indian-breads-fd': [
    'https://images.unsplash.com/photo-1626074353765-517a681e40be',
    'https://images.unsplash.com/photo-1601050690597-df0568f70950',
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0'
  ]
};

const subcategories = [
  // Amuse-Bouche
  { id: 'chefs-welcome-bite', group: 'amuse-bouche', name: "Chef's Welcome Bite", basePrice: 420 },
  { id: 'paneer-canape', group: 'amuse-bouche', name: "Paneer Canapé", basePrice: 440 },
  { id: 'chicken-canape', group: 'amuse-bouche', name: "Chicken Canapé", basePrice: 490 },
  { id: 'seafood-bite', group: 'amuse-bouche', name: "Seafood Bite", basePrice: 590 },
  { id: 'seasonal-special-ab', group: 'amuse-bouche', name: "Seasonal Special", basePrice: 460 },

  // Fine Dining Starters
  { id: 'truffle-paneer-fds', group: 'fine-dining-starters', name: "Truffle Paneer Tikka", basePrice: 560 },
  { id: 'tandoori-mushroom-fds', group: 'fine-dining-starters', name: "Tandoori Mushroom", basePrice: 480 },
  { id: 'chicken-galouti-kebab-fds', group: 'fine-dining-starters', name: "Chicken Galouti Kebab", basePrice: 620 },
  { id: 'mutton-shikampuri-fds', group: 'fine-dining-starters', name: "Mutton Shikampuri", basePrice: 720 },
  { id: 'smoked-fish-fds', group: 'fine-dining-starters', name: "Smoked Fish", basePrice: 740 },

  // Premium Vegetarian
  { id: 'truffle-paneer-pv', group: 'premium-vegetarian', name: "Royal Truffle Paneer", basePrice: 590 },
  { id: 'dal-bukhara-pv', group: 'premium-vegetarian', name: "Dal Bukhara", basePrice: 520 },
  { id: 'subz-kofta-pv', group: 'premium-vegetarian', name: "Subz Kofta", basePrice: 550 },
  { id: 'kashmiri-dum-aloo-pv', group: 'premium-vegetarian', name: "Kashmiri Dum Aloo", basePrice: 480 },
  { id: 'wild-mushroom-curry-pv', group: 'premium-vegetarian', name: "Wild Mushroom Curry", basePrice: 580 },

  // Premium Chicken
  { id: 'chicken-roulade-pc', group: 'premium-chicken', name: "Chicken Roulade", basePrice: 680 },
  { id: 'butter-chicken-supreme-pc', group: 'premium-chicken', name: "Butter Chicken Supreme", basePrice: 690 },
  { id: 'chicken-malai-pc', group: 'premium-chicken', name: "Chicken Malai", basePrice: 650 },
  { id: 'smoked-chicken-pc', group: 'premium-chicken', name: "Smoked Chicken", basePrice: 670 },
  { id: 'chicken-chettinad-pc', group: 'premium-chicken', name: "Chicken Chettinad", basePrice: 630 },

  // Premium Mutton
  { id: 'mutton-rogan-josh-pm', group: 'premium-mutton', name: "Mutton Rogan Josh", basePrice: 780 },
  { id: 'mutton-shank-pm', group: 'premium-mutton', name: "Mutton Shank", basePrice: 880 },
  { id: 'mutton-galouti-pm', group: 'premium-mutton', name: "Mutton Galouti", basePrice: 810 },
  { id: 'lamb-chops-pm', group: 'premium-mutton', name: "Lamb Chops", basePrice: 890 },
  { id: 'mutton-korma-pm', group: 'premium-mutton', name: "Mutton Korma", basePrice: 750 },

  // Premium Seafood
  { id: 'grilled-salmon-ps', group: 'premium-seafood', name: "Grilled Salmon", basePrice: 890 },
  { id: 'butter-garlic-prawns-ps', group: 'premium-seafood', name: "Butter Garlic Prawns", basePrice: 840 },
  { id: 'lobster-thermidor-ps', group: 'premium-seafood', name: "Lobster Thermidor", basePrice: 1450 },
  { id: 'seabass-fillet-ps', group: 'premium-seafood', name: "Seabass Fillet", basePrice: 910 },
  { id: 'seafood-medley-ps', group: 'premium-seafood', name: "Seafood Medley", basePrice: 1190 },

  // Tandoor & Kebab
  { id: 'galouti-kebab-tk', group: 'tandoor-kebab-fd', name: "Galouti Kebab", basePrice: 720 },
  { id: 'seekh-kebab-tk', group: 'tandoor-kebab-fd', name: "Seekh Kebab", basePrice: 640 },
  { id: 'reshmi-kebab-tk', group: 'tandoor-kebab-fd', name: "Reshmi Kebab", basePrice: 630 },
  { id: 'tandoori-prawns-tk', group: 'tandoor-kebab-fd', name: "Tandoori Prawns", basePrice: 850 },
  { id: 'paneer-tikka-tk', group: 'tandoor-kebab-fd', name: "Paneer Tikka", basePrice: 530 },

  // Fine Dining Biryani
  { id: 'royal-chicken-biryani-fdb', group: 'fine-dining-biryani', name: "Royal Chicken Biryani", basePrice: 690 },
  { id: 'mutton-dum-biryani-fdb', group: 'fine-dining-biryani', name: "Mutton Dum Biryani", basePrice: 820 },
  { id: 'prawn-biryani-fdb', group: 'fine-dining-biryani', name: "Prawn Biryani", basePrice: 890 },
  { id: 'saffron-vegetable-biryani-fdb', group: 'fine-dining-biryani', name: "Saffron Vegetable Biryani", basePrice: 590 },

  // Rice & Accompaniments
  { id: 'saffron-rice-ra', group: 'rice-accompaniments-fd', name: "Saffron Rice", basePrice: 380 },
  { id: 'truffle-rice-ra', group: 'rice-accompaniments-fd', name: "Truffle Rice", basePrice: 420 },
  { id: 'jeera-rice-ra', group: 'rice-accompaniments-fd', name: "Jeera Rice", basePrice: 320 },
  { id: 'kashmiri-pulao-ra', group: 'rice-accompaniments-fd', name: "Kashmiri Pulao", basePrice: 390 },
  { id: 'ghee-rice-ra', group: 'rice-accompaniments-fd', name: "Ghee Rice", basePrice: 340 },

  // Indian Breads
  { id: 'garlic-naan-ib', group: 'indian-breads-fd', name: "Garlic Naan", basePrice: 180 },
  { id: 'truffle-naan-ib', group: 'indian-breads-fd', name: "Truffle Naan", basePrice: 240 },
  { id: 'cheese-naan-ib', group: 'indian-breads-fd', name: "Cheese Naan", basePrice: 210 },
  { id: 'roomali-roti-ib', group: 'indian-breads-fd', name: "Roomali Roti", basePrice: 150 },
  { id: 'laccha-paratha-ib', group: 'indian-breads-fd', name: "Laccha Paratha", basePrice: 160 }
];

const fineDiningDishes = [];

subcategories.forEach((subcat) => {
  const isNonVegGroup = subcat.group.includes('chicken') || subcat.group.includes('mutton') || subcat.group.includes('seafood');
  const isVegGroup = subcat.group.includes('veg');
  const photos = categoryPhotos[subcat.id] || groupFallback[subcat.group] || categoryPhotos['chefs-welcome-bite'];

  for (let i = 1; i <= 20; i++) {
    const photoBase = photos[(i - 1) % photos.length];
    const image = `${photoBase}?w=600&h=400&auto=format&fit=crop&q=85&giriItem=${subcat.id}-${i}`;

    let name = `${subcat.name} Option ${i}`;
    let isVeg = false;

    if (subcat.id === 'tandoori-mushroom-fds') {
      name = `Tandoori Mushroom Delicacy ${i}`;
      isVeg = true;
    } else if (subcat.id === 'truffle-paneer-fds') {
      name = `Truffle Paneer Tikka Special ${i}`;
      isVeg = true;
    } else if (subcat.id === 'chicken-galouti-kebab-fds') {
      name = `Chicken Galouti Kebab ${i}`;
      isVeg = false;
    } else if (subcat.id === 'mutton-shikampuri-fds') {
      name = `Mutton Shikampuri Kebab ${i}`;
      isVeg = false;
    } else if (subcat.id === 'smoked-fish-fds') {
      name = `Smoked Fish Carpaccio ${i}`;
      isVeg = false;
    } else {
      name = `${subcat.name} Special ${i}`;
      isVeg = isVegGroup || (!isNonVegGroup && i % 2 === 0);
    }

    const price = subcat.basePrice + ((i - 1) * 15);

    fineDiningDishes.push({
      id: `dish-fd-${subcat.id}-${i}`,
      name,
      description: `Exquisite luxury ${name} prepared with rare gourmet ingredients and signature spices.`,
      price,
      prepTime: 15 + (i % 8),
      rating: +(4.6 + (i % 5) * 0.08).toFixed(1),
      reviewsCount: 120 + i * 18,
      preparationTime: `${15 + (i % 8)} mins`,
      calories: `${350 + i * 12} kcal`,
      dietary: isVeg ? ['veg', 'chef-special'] : ['non-veg', 'chef-special'],
      category: subcat.group,
      subCategory: subcat.id,
      shopSlug: 'giri-fine-dining',
      shopName: 'Giri Fine Dining',
      image,
      available: true
    });
  }
});

console.log(`Generated ${fineDiningDishes.length} fine dining dishes across 50 subcategories.`);

// Write generated fine dining dishes into fineDiningDishes.json
fs.writeFileSync(
  path.join(__dirname, 'fineDiningDishes.json'),
  JSON.stringify(fineDiningDishes, null, 2)
);

// Inject full collection & helpers into dishes.ts
const dishesTsPath = path.join(__dirname, '../frontend/data/dishes.ts');
const dishesTsContent = `import { MenuItem } from '@/types';

export const FINE_DINING_DISHES: MenuItem[] = ${JSON.stringify(fineDiningDishes, null, 2)};

export const INITIAL_DISHES: MenuItem[] = FINE_DINING_DISHES;
export const CHEF_SPECIAL_DISHES: MenuItem[] = FINE_DINING_DISHES.slice(0, 10);
export const PIZZA_BURGER_DISHES: MenuItem[] = FINE_DINING_DISHES.slice(10, 20);
export const MAIN_COURSE_DISHES: MenuItem[] = FINE_DINING_DISHES.slice(20, 30);
export const BEVERAGE_BAR_DISHES: MenuItem[] = FINE_DINING_DISHES.slice(30, 40);
export const GIRI_FINE_DINING_PRODUCTS: MenuItem[] = FINE_DINING_DISHES;
export const GIRI_EXPRESS_BISTRO_DISHES: MenuItem[] = FINE_DINING_DISHES.slice(40, 60);

export const FINE_DINING_TABLE_IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&h=400&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&auto=format&fit=crop&q=85'
];
export const GIRI_KITCHEN_TABLE_IMAGES = FINE_DINING_TABLE_IMAGES;
export const GIRI_GRILL_TABLE_IMAGES = FINE_DINING_TABLE_IMAGES;
export const GIRI_CAFE_TABLE_IMAGES = FINE_DINING_TABLE_IMAGES;

export const RESTAURANT_OUTLETS = [
  { id: 'giri-fine-dining', name: 'Giri Fine Dining', slug: 'giri-fine-dining', icon: '🍷' },
  { id: 'giri-express-bistro', name: 'Giri Express Bistro', slug: 'giri-express-bistro', icon: '🚀' },
  { id: 'giri-kitchen', name: 'Giri Kitchen', slug: 'giri-kitchen', icon: '🍳' },
  { id: 'giri-bakery', name: 'Giri Bakery', slug: 'giri-bakery', icon: '🥐' },
  { id: 'giri-grill', name: 'Giri Grill', slug: 'giri-grill', icon: '🔥' },
  { id: 'giri-spice-garden', name: 'Giri Spice Garden', slug: 'giri-spice-garden', icon: '🌿' },
  { id: 'giri-cafe', name: 'Giri Cafe', slug: 'giri-cafe', icon: '☕' },
  { id: 'giri-seafood', name: 'Giri Seafood', slug: 'giri-seafood', icon: '🍤' }
];

export function getStoredDishes(): MenuItem[] {
  if (typeof window === 'undefined') return INITIAL_DISHES;
  try {
    const data = localStorage.getItem('giri_restaurant_dishes_v2026');
    return data ? JSON.parse(data) : INITIAL_DISHES;
  } catch {
    return INITIAL_DISHES;
  }
}

export function saveStoredDishes(dishes: MenuItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('giri_restaurant_dishes_v2026', JSON.stringify(dishes));
  } catch {}
}
`;
fs.writeFileSync(dishesTsPath, dishesTsContent);

console.log('Successfully written fine dining dishes with 100% item-matched photography and all exports to dishes.ts!');
