import { useLocaleStore } from "@/stores/localeStore";

interface NutritionRow {
  name: { de: string; en: string };
  per100g?: string;
  perPortion?: string;
  menge?: string;
  nrv?: string;
  isSubItem?: boolean;
}

interface NutritionData {
  type: 'naehrwerte' | 'inhaltsstoffe';
  title?: { de: string; en: string };
  portionInfo?: string;
  introText?: { de: string; en: string };
  rows: NutritionRow[];
  footnote?: { de: string; en: string };
}

const nutritionData: Record<string, NutritionData> = {
  'kollagen-hydrolysat-pulver': {
    type: 'inhaltsstoffe',
    title: {
      de: 'Inhaltsstoffe pro Tagesdosis (2 Kapseln)',
      en: 'Ingredients per daily dose (2 capsules)'
    },
    rows: [
      { name: { de: 'Kollagenhydrolysat', en: 'Collagen Hydrolysate' }, menge: '450mg', nrv: '/' },
      { name: { de: 'Hyaluronsäure', en: 'Hyaluronic Acid' }, menge: '50mg', nrv: '/' },
      { name: { de: 'Granatapfel Extrakt', en: 'Pomegranate Extract' }, menge: '10mg', nrv: '/' },
      { name: { de: 'davon Ellagsäure', en: 'of which Ellagic Acid' }, menge: '4mg', nrv: '/', isSubItem: true },
      { name: { de: 'Vitamin C', en: 'Vitamin C' }, menge: '12mg', nrv: '15%' },
      { name: { de: 'Vitamin B3', en: 'Vitamin B3' }, menge: '8mg', nrv: '50%' },
      { name: { de: 'Zink', en: 'Zinc' }, menge: '2,5mg', nrv: '25%' },
      { name: { de: 'Vitamin A', en: 'Vitamin A' }, menge: '400µg', nrv: '50%' },
      { name: { de: 'Selen', en: 'Selenium' }, menge: '27,5µg', nrv: '50%' },
      { name: { de: 'Vitamin D3', en: 'Vitamin D3' }, menge: '2,5µg', nrv: '50%' },
    ],
    footnote: {
      de: 'Zutaten: Kollagenhydrolysat (Rind) (65,22%), Überzugsmittel: Hydroxypropylmethylcellulose, Natriumhyaluronat (8,05%), L-Ascorbinsäure (2,03%), Zinkbisglycinat (1,55%), Granatapfelfrucht-Trockenextrakt (1,45%), Trennmittel: L-Leucin, Nicotinamid (1,39%), Reisstärke, Retinylacetat (0,47%), Cholecalciferol (0,17%), Natriumselenit (0,01%)',
      en: 'Ingredients: Collagen Hydrolysate (Bovine) (65.22%), Coating: Hydroxypropyl methylcellulose, Sodium hyaluronate (8.05%), L-Ascorbic acid (2.03%), Zinc bisglycinate (1.55%), Pomegranate fruit dry extract (1.45%), Anti-caking agent: L-Leucine, Nicotinamide (1.39%), Rice starch, Retinyl acetate (0.47%), Cholecalciferol (0.17%), Sodium selenite (0.01%)'
    }
  },
  'glucosamin-pulver': {
    type: 'inhaltsstoffe',
    title: {
      de: 'Inhaltsstoffe pro Tagesdosis (1.500mg) / HACCP Konform',
      en: 'Ingredients per daily dose (1,500mg) / HACCP Certified'
    },
    rows: [
      { name: { de: 'Glucosamin HCL', en: 'Glucosamine HCL' }, menge: '1,500mg', nrv: '/' },
    ],
  },
  'chondroitin-pulver': {
    type: 'inhaltsstoffe',
    title: {
      de: 'Inhaltsstoffe pro Tagesdosis (1.000mg) / HACCP Konform',
      en: 'Ingredients per daily dose (1,000mg) / HACCP Certified'
    },
    rows: [
      { name: { de: 'Chondroitinsulfat', en: 'Chondroitin Sulfate' }, menge: '1,000mg', nrv: '/' },
    ],
  },
  'msm-pulver': {
    type: 'inhaltsstoffe',
    title: {
      de: 'Inhaltsstoffe pro Tagesdosis (4g) / HACCP Konform',
      en: 'Ingredients per daily dose (4g) / HACCP Certified'
    },
    rows: [
      { name: { de: 'Methylsulfonylmethan', en: 'Methylsulfonylmethane' }, menge: '4g', nrv: '/' },
    ],
  },
  'omega-3-softgels': {
    type: 'inhaltsstoffe',
    title: {
      de: 'Inhaltsstoffe pro Tagesdosis (2 Kapseln) / HACCP Konform',
      en: 'Ingredients per daily dose (2 capsules) / HACCP Certified'
    },
    rows: [
      { name: { de: 'Omega 3 Fettsäuren', en: 'Omega 3 Fatty Acids' }, menge: '2,000mg', nrv: '/' },
      { name: { de: 'davon EPA', en: 'of which EPA' }, menge: '360mg', nrv: '/', isSubItem: true },
      { name: { de: 'davon DHA', en: 'of which DHA' }, menge: '240mg', nrv: '/', isSubItem: true },
      { name: { de: 'Vitamin E', en: 'Vitamin E' }, menge: '2.6mg', nrv: '22%' },
    ],
  },
  'vitamin-c-zink-elderberry-gummies': {
    type: 'inhaltsstoffe',
    title: {
      de: 'Inhaltsstoffe pro 2 Stück (6g) / HACCP Konform, GMP & ISO 22000 Zertifiziert',
      en: 'Ingredients per 2 pieces (6g) / HACCP Certified, GMP & ISO 22000 Certified'
    },
    rows: [
      { name: { de: 'Vitamin C', en: 'Vitamin C' }, menge: '90 mg', nrv: '112%' },
      { name: { de: 'Schwarzer Holunderbeerextrakt', en: 'Black Elderberry Extract' }, menge: '100 mg', nrv: '/' },
      { name: { de: 'Zink', en: 'Zinc' }, menge: '7.5 mg', nrv: '75%' },
    ],
  },
};

interface NutritionTableProps {
  handle: string;
}

export const NutritionTable = ({ handle }: NutritionTableProps) => {
  const locale = useLocaleStore(state => state.locale);
  const isEnglish = locale.startsWith('en');
  const data = nutritionData[handle];
  
  if (!data) {
    return (
      <div className="text-muted-foreground">
        <p>{isEnglish 
          ? 'Premium quality ingredients, tested and without unnecessary additives.' 
          : 'Hochwertige Inhaltsstoffe in Premium-Qualität, ohne unnötige Zusatzstoffe.'}</p>
        <p className="mt-2">{isEnglish 
          ? 'Manufactured according to the highest quality standards (HACCP certified).' 
          : 'Hergestellt nach höchsten Qualitätsstandards (HACCP-zertifiziert).'}</p>
      </div>
    );
  }

  if (data.type === 'naehrwerte') {
    return (
      <div className="space-y-4">
        {data.introText && (
          <p className="text-muted-foreground mb-4">{isEnglish ? data.introText.en : data.introText.de}</p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                  {isEnglish ? 'Nutrition Facts' : 'Nährwerte'}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                  {isEnglish ? 'per 100g' : 'pro 100g'}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, index) => (
                <tr 
                  key={index} 
                  className={`${index % 2 === 0 ? 'bg-background' : 'bg-secondary/5'} border-b border-border/50`}
                >
                  <td className={`py-3 px-4 text-foreground ${row.isSubItem ? 'pl-8' : ''}`}>
                    {row.isSubItem && <span className="mr-2">•</span>}
                    {isEnglish ? row.name.en : row.name.de}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {row.per100g}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          {isEnglish 
            ? 'Manufactured according to the highest quality standards (HACCP certified).' 
            : 'Hergestellt nach höchsten Qualitätsstandards (HACCP-zertifiziert).'}
        </p>
      </div>
    );
  }

  // Inhaltsstoffe table
  return (
    <div className="space-y-4">
      {data.title && (
        <p className="font-semibold text-foreground mb-2">{isEnglish ? data.title.en : data.title.de}</p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                {isEnglish ? 'Ingredient' : 'Inhaltsstoff'}
              </th>
              <th className="text-center py-3 px-4 font-semibold text-foreground border-b border-border">
                {isEnglish ? 'Amount' : 'Menge'}
              </th>
              <th className="text-center py-3 px-4 font-semibold text-foreground border-b border-border">
                NRV*
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, index) => (
              <tr 
                key={index} 
                className={`${index % 2 === 0 ? 'bg-background' : 'bg-secondary/5'} border-b border-border/50`}
              >
                <td className={`py-3 px-4 text-foreground ${row.isSubItem ? 'pl-8' : ''}`}>
                  {row.isSubItem && <span className="mr-2">•</span>}
                  {isEnglish ? row.name.en : row.name.de}
                </td>
                <td className="py-3 px-4 text-center text-muted-foreground">
                  {row.menge}
                </td>
                <td className="py-3 px-4 text-center text-muted-foreground">
                  {row.nrv}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        {isEnglish 
          ? '*Percent of Nutrient Reference Values (NRV) according to Regulation (EU) No 1169/2011 (LMIV)' 
          : '*% NRV = Prozent des Nährstoffbezugswertes gemäß Anhang XIII der Verordnung (EU) Nr. 1169/2011 (LMIV)'}
      </p>
      {data.footnote && (
        <p className="text-xs text-muted-foreground mt-3">
          {isEnglish ? data.footnote.en : data.footnote.de}
        </p>
      )}
      <p className="text-xs text-muted-foreground mt-2">
        {isEnglish 
          ? 'Manufactured according to the highest quality standards (HACCP compliant).' 
          : 'Hergestellt nach höchsten Qualitätsstandards (HACCP-konform).'}
      </p>
    </div>
  );
};
