// Seed data generated from "Year_end_inventory_template.docx" and
// "2025_Year_End_Inventory.docx". This defines the checklist STRUCTURE
// (spaces + items) and pre-loads the 2025 counts as historical reference.
//
// Structure and records are intentionally separate:
//  - STRUCTURE = the list of spaces/items (can be edited: add/rename/remove)
//  - RECORDS   = the values recorded for a given year, keyed by item id
//
// This lets you look back at any past year's numbers next to this year's
// blank checklist, without losing history when the checklist evolves.

const SEED_STRUCTURE = [
  {
    id: "space_mudroom", name: "Mud Room / Laundry Area", items: [
      { id: "i_launddet", name: "Laundry detergent" },
      { id: "i_glassdet", name: "Concentrated glass detergent (with squeegee)" },
      { id: "i_pinesol", name: "Pine Sol" },
      { id: "i_apc", name: "All Purpose Cleaner" },
      { id: "i_mothballs", name: "Moth balls" },
      { id: "i_scour_mud", name: "Scouring powder" },
    ]
  },
  {
    id: "space_insect", name: "Insect Repellents", items: [
      { id: "i_offlotion", name: "Off lotion and spray" },
    ]
  },
  {
    id: "space_sunscreen", name: "Sunscreens", items: [
      { id: "i_sunscreen", name: "Sunscreens" },
    ]
  },
  {
    id: "space_bulbs", name: "Light Bulbs", items: [
      { id: "i_bulb100", name: "100w LED bulbs" },
      { id: "i_bulb65flood", name: "65w LED indoor flood" },
      { id: "i_bulbout", name: "Outdoor flood" },
      { id: "i_bulbfridge", name: "Fridge bulb" },
    ]
  },
  {
    id: "space_foils", name: "Foils, Bags & Wraps", items: [
      { id: "i_qtstorage", name: "1 Quart storage bags" },
      { id: "i_qtfreezer", name: "1 Quart freezer bags" },
      { id: "i_galstorage", name: "1 Gallon storage bags" },
      { id: "i_galfreezer", name: "1 Gallon freezer bags" },
      { id: "i_baggies1gal", name: "Baggies (1 gal.)" },
      { id: "i_sandwich_foils", name: "Sandwich bags" },
      { id: "i_clingwrap_foils", name: "Cling wrap" },
      { id: "i_parchment_foils", name: "Parchment paper" },
      { id: "i_waxpaper_foils", name: "Wax paper" },
      { id: "i_alumfoil_foils", name: "Aluminum foil" },
    ]
  },
  {
    id: "space_kcloset", name: "Kitchen Closet", items: [
      { id: "i_anttraps", name: "Ant traps" },
      { id: "i_laundrypods", name: "Laundry detergent pods" },
      { id: "i_surveytape", name: "Surveyor tape" },
    ]
  },
  {
    id: "space_kclosetfood", name: "Kitchen Closet Food", items: [
      { id: "i_spaghetti", name: "Spaghetti" },
      { id: "i_rice_closet", name: "Rice" },
    ]
  },
  {
    id: "space_kdrawers", name: "Kitchen Drawers", items: [
      { id: "i_clingwrap_dr", name: "Cling wrap" },
      { id: "i_alumfoil_dr", name: "Aluminum foil" },
      { id: "i_waxpaper_dr", name: "Wax paper" },
      { id: "i_snackbags", name: "Snack bags" },
      { id: "i_sandwich_dr", name: "Sandwich bags" },
      { id: "i_qtstorage_dr", name: "1 Quart storage bags" },
      { id: "i_parchment_dr", name: "Parchment paper" },
      { id: "i_parchsheets_dr", name: "Parchment paper sheets" },
      { id: "i_baggies_dr", name: "Baggies" },
    ]
  },
  {
    id: "space_undersink", name: "Kitchen — Under Sink", items: [
      { id: "i_papertowels_us", name: "Paper towels" },
      { id: "i_trash4", name: "Trash bags (white) 4 gal" },
      { id: "i_trash13", name: "Trash bags (white) 13 gal" },
      { id: "i_trash30", name: "Trash bags (black) 30 gal" },
      { id: "i_dishliquid", name: "Dish washing liquid" },
      { id: "i_dishwasherdet", name: "Dish washer detergent" },
      { id: "i_scour_us", name: "Scouring powder" },
      { id: "i_dispgloves", name: "Disposable gloves" },
      { id: "i_rubbergloves", name: "Rubber gloves" },
      { id: "i_sponges", name: "Sponges" },
      { id: "i_rinseaid", name: "Rinse aid" },
      { id: "i_cooktopcleaner", name: "Cook top cleaner" },
    ]
  },
  {
    id: "space_cupboards", name: "Cupboards and Counter", items: [
      { id: "i_rice_can", name: "Rice (canister)" },
      { id: "i_flour_can", name: "Flour (canister)" },
      { id: "i_flour_shelf", name: "Flour (shelf)" },
      { id: "i_sugar_can", name: "Sugar (canister)" },
      { id: "i_sugar_shelf", name: "Sugar (shelf)" },
      { id: "i_brownsugar_can", name: "Brown sugar (canister)" },
      { id: "i_brownsugar_shelf", name: "Brown sugar (shelf)" },
      { id: "i_darkbrownsugar", name: "Dark brown sugar" },
      { id: "i_powsugar_can", name: "Powdered sugar (canister)" },
      { id: "i_powsugar", name: "Powdered sugar" },
      { id: "i_bakingcups", name: "Baking cups" },
      { id: "i_bakingsoda", name: "Baking soda" },
      { id: "i_bakingpowder", name: "Baking powder" },
      { id: "i_tea", name: "Tea" },
      { id: "i_spices_general", name: "Spices" },
      { id: "i_toothpicks", name: "Toothpicks" },
      { id: "i_cornstarch", name: "Corn starch" },
      { id: "i_cornmeal", name: "Corn meal" },
      { id: "i_oatmeal", name: "Oatmeal" },
      { id: "i_oatmeal1min", name: "Oatmeal, 1 minute" },
      { id: "i_cocoa", name: "Cocoa (Dutch)" },
      { id: "i_choc_unsweet", name: "Chocolate, unsweetened" },
      { id: "i_vinegar_white", name: "Vinegar, white" },
      { id: "i_vinegar_cider", name: "Vinegar, apple cider" },
      { id: "i_karo", name: "Karo syrup" },
    ]
  },
  {
    id: "space_dining", name: "Dining Area", items: [
      { id: "i_napkins_lunch", name: "Napkins — lunch" },
      { id: "i_napkins_dinner", name: "Napkins — dinner" },
      { id: "i_napkins_cocktail", name: "Napkins — cocktail" },
      { id: "i_papercups", name: "Paper cups" },
      { id: "i_plasticcups", name: "Plastic cups" },
      { id: "i_straws", name: "Straws" },
      { id: "i_votive", name: "Votive candles" },
      { id: "i_tapered", name: "Tapered candles, white" },
    ]
  },
  {
    id: "space_downbath", name: "Downstairs Bathroom", items: [
      { id: "i_papertowels_db", name: "Paper towels" },
      { id: "i_kleenex_db", name: "Kleenex" },
      { id: "i_shampoo_db", name: "Shampoo" },
      { id: "i_conditioner_db", name: "Conditioner" },
      { id: "i_handsoap_db", name: "Hand soap" },
      { id: "i_lotion_db", name: "Lotion" },
      { id: "i_drano_db", name: "Drano" },
      { id: "i_scour_db", name: "Scouring powder" },
    ]
  },
  {
    id: "space_upbath", name: "Upstairs Bathroom", items: [
      { id: "i_toiletpaper_ub", name: "Toilet paper" },
      { id: "i_kleenex_ub", name: "Kleenex" },
      { id: "i_shampoo_ub", name: "Shampoo" },
      { id: "i_conditioner_ub", name: "Conditioner" },
      { id: "i_hairspray_ub", name: "Hair spray" },
      { id: "i_handsoap_ub", name: "Hand soap" },
      { id: "i_lotion_ub", name: "Lotion" },
      { id: "i_toothpaste_ub", name: "Toothpaste" },
      { id: "i_qtips_ub", name: "Q-Tips" },
      { id: "i_scour_ub", name: "Scouring powder" },
      { id: "i_apc_ub", name: "All purpose cleaner" },
      { id: "i_razors_ub", name: "Disposable razors" },
    ]
  },
  {
    id: "space_garage_sink", name: "Garage — Cabinets under sink & counter", items: [
      { id: "i_garage_current_supply", name: "Current-use toilet paper / paper towels / Kleenex (left-hand cupboard)" },
    ]
  },
  {
    id: "space_garage_tall", name: "Garage — Tall cabinet by water heater", items: [
      { id: "i_candles_garage", name: "Candles" },
      { id: "i_plasticknives", name: "Plastic knives" },
      { id: "i_tomatoextenders", name: "Tomato plant season extenders" },
    ]
  },
  {
    id: "space_spices", name: "Spices (ground unless noted)", items: [
      { id: "sp_allspice", name: "Allspice" },
      { id: "sp_blackpepper", name: "Black pepper" },
      { id: "sp_basil", name: "Basil leaves" },
      { id: "sp_bayleaves", name: "Bay leaves" },
      { id: "sp_crushedred", name: "Crushed red pepper" },
      { id: "sp_chipotle", name: "Chipotle chili pepper" },
      { id: "sp_cinnamon", name: "Cinnamon" },
      { id: "sp_chilipowder", name: "Chili powder" },
      { id: "sp_creamtartar", name: "Cream of tartar" },
      { id: "sp_cloves", name: "Cloves" },
      { id: "sp_clovesw", name: "Cloves, whole" },
      { id: "sp_cumin", name: "Cumin" },
      { id: "sp_curry", name: "Curry powder" },
      { id: "sp_dill", name: "Dill" },
      { id: "sp_ginger", name: "Ginger" },
      { id: "sp_italian", name: "Italian seasoning" },
      { id: "sp_marjoram", name: "Marjoram" },
      { id: "sp_mustard", name: "Mustard" },
      { id: "sp_nutmeg", name: "Nutmeg" },
      { id: "sp_onionpowder", name: "Onion powder" },
      { id: "sp_paprika", name: "Paprika" },
      { id: "sp_peppercorns", name: "Peppercorns" },
      { id: "sp_rosemary", name: "Rosemary leaves" },
      { id: "sp_saffron", name: "Saffron" },
      { id: "sp_sesame", name: "Sesame seeds" },
      { id: "sp_thyme", name: "Thyme" },
      { id: "sp_turmeric", name: "Turmeric" },
    ]
  },
];

// 2025 recorded values, keyed by item id -> { value, need }
const SEED_RECORDS_2025 = {
  i_launddet: { value: "20 pods (see kitchen closet)", need: false },
  i_glassdet: { value: "10 oz", need: false },
  i_pinesol: { value: "28 oz", need: false },
  i_apc: { value: "10 oz", need: false },
  i_mothballs: { value: "½ box", need: false },
  i_scour_mud: { value: "½ can", need: false },
  i_offlotion: { value: "lots", need: false },
  i_sunscreen: { value: "", need: true },
  i_bulb100: { value: "3", need: false },
  i_bulb65flood: { value: "4", need: false },
  i_bulbout: { value: "3", need: false },
  i_bulbfridge: { value: "", need: true },
  i_qtstorage: { value: "", need: true },
  i_qtfreezer: { value: "50", need: false },
  i_galstorage: { value: "see baggies", need: false },
  i_galfreezer: { value: "55", need: false },
  i_baggies1gal: { value: "94", need: false },
  i_sandwich_foils: { value: "45", need: false },
  i_clingwrap_foils: { value: "400'", need: false },
  i_parchment_foils: { value: "190'", need: false },
  i_waxpaper_foils: { value: "70'", need: false },
  i_alumfoil_foils: { value: "125'", need: false },
  i_anttraps: { value: "5", need: false },
  i_laundrypods: { value: "57 pods", need: false },
  i_surveytape: { value: "2 rolls", need: false },
  i_spaghetti: { value: "1 box linguini", need: false },
  i_rice_closet: { value: "½ bag", need: true },
  i_clingwrap_dr: { value: "100'", need: false },
  i_alumfoil_dr: { value: "25'", need: false },
  i_waxpaper_dr: { value: "30'", need: false },
  i_snackbags: { value: "50", need: false },
  i_sandwich_dr: { value: "100", need: false },
  i_qtstorage_dr: { value: "48", need: false },
  i_parchment_dr: { value: "10'", need: false },
  i_parchsheets_dr: { value: "a few", need: false },
  i_baggies_dr: { value: "20", need: false },
  i_papertowels_us: { value: "see downstairs bathroom", need: false },
  i_trash4: { value: "15", need: false },
  i_trash13: { value: "60", need: false },
  i_trash30: { value: "26", need: false },
  i_dishliquid: { value: "", need: true },
  i_dishwasherdet: { value: "70 pods", need: false },
  i_scour_us: { value: "2 half cans", need: false },
  i_dispgloves: { value: "50", need: false },
  i_rubbergloves: { value: "1 pair", need: true },
  i_sponges: { value: "lots", need: false },
  i_rinseaid: { value: "", need: true },
  i_cooktopcleaner: { value: "3 full bottles", need: false },
  i_rice_can: { value: "see kitchen closet", need: false },
  i_flour_can: { value: "1 lb.", need: false },
  i_flour_shelf: { value: "", need: true },
  i_sugar_can: { value: "1 lb.", need: false },
  i_sugar_shelf: { value: "4 lb.", need: false },
  i_brownsugar_can: { value: "½ lb.", need: true },
  i_brownsugar_shelf: { value: "0", need: false },
  i_darkbrownsugar: { value: "½ lb.", need: false },
  i_powsugar_can: { value: "", need: false },
  i_powsugar: { value: "1 ½ lb.", need: false },
  i_bakingcups: { value: "many", need: false },
  i_bakingsoda: { value: "¾ lb.", need: false },
  i_bakingpowder: { value: "6 oz.", need: false },
  i_tea: { value: "Peppermint tea needed", need: true },
  i_spices_general: { value: "3 oz. vanilla; lots of pepper", need: false },
  i_toothpicks: { value: "½ box", need: false },
  i_cornstarch: { value: "5/8 lb.", need: false },
  i_cornmeal: { value: "20 oz.", need: false },
  i_oatmeal: { value: "¼ box", need: false },
  i_oatmeal1min: { value: "Full box", need: false },
  i_cocoa: { value: "8.8 oz", need: false },
  i_choc_unsweet: { value: "10 oz.", need: false },
  i_vinegar_white: { value: "8 oz.", need: false },
  i_vinegar_cider: { value: "10 oz.", need: false },
  i_karo: { value: "8 oz.", need: false },
  i_napkins_lunch: { value: "200", need: false },
  i_napkins_dinner: { value: "40", need: false },
  i_napkins_cocktail: { value: "lots", need: false },
  i_papercups: { value: "", need: true },
  i_plasticcups: { value: "30", need: false },
  i_straws: { value: "lots", need: false },
  i_votive: { value: "45", need: false },
  i_tapered: { value: "8", need: false },
  i_papertowels_db: { value: "10 rolls", need: false },
  i_kleenex_db: { value: "6 travel size", need: false },
  i_shampoo_db: { value: "2 full bottles (24 oz)", need: false },
  i_conditioner_db: { value: "0", need: true },
  i_handsoap_db: { value: "1 bar", need: false },
  i_lotion_db: { value: "1 bottle", need: false },
  i_drano_db: { value: "42 oz.", need: false },
  i_scour_db: { value: "0", need: true },
  i_toiletpaper_ub: { value: "49 rolls", need: false },
  i_kleenex_ub: { value: "6 boxes", need: false },
  i_shampoo_ub: { value: "see downstairs bathroom", need: false },
  i_conditioner_ub: { value: "full bottle", need: false },
  i_hairspray_ub: { value: "0", need: true },
  i_handsoap_ub: { value: "", need: false },
  i_lotion_ub: { value: "3 partial", need: false },
  i_toothpaste_ub: { value: "2 ½ tubes", need: false },
  i_qtips_ub: { value: "new box", need: false },
  i_scour_ub: { value: "1 can", need: false },
  i_apc_ub: { value: "", need: true },
  i_razors_ub: { value: "3", need: false },
  i_garage_current_supply: { value: "in left-hand cupboard", need: false },
  i_candles_garage: { value: "", need: false },
  i_plasticknives: { value: "", need: false },
  i_tomatoextenders: { value: "", need: false },
};
