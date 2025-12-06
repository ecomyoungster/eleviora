interface NutritionRow {
  name: string;
  per100g?: string;
  perPortion?: string;
  menge?: string;
  nrv?: string;
  isSubItem?: boolean;
}

interface NutritionData {
  type: 'naehrwerte' | 'inhaltsstoffe';
  title?: string;
  portionInfo?: string;
  introText?: string;
  rows: NutritionRow[];
  footnote?: string;
}

const nutritionData: Record<string, NutritionData> = {
  'kollagen-hydrolysat-pulver': {
    type: 'naehrwerte',
    introText: '99,8% Kollagen-Hydrolysat-Pulver (Rind), Vitamin C',
    rows: [
      { name: 'Energie', per100g: '1530 kJ / 360 kcal', perPortion: '' },
      { name: 'Fett', per100g: '0g', perPortion: '' },
      { name: 'davon gesättigte Fettsäuren', per100g: '0g', perPortion: '', isSubItem: true },
      { name: 'Kohlenhydrate', per100g: '0g', perPortion: '' },
      { name: 'davon Zucker', per100g: '0g', perPortion: '', isSubItem: true },
      { name: 'Eiweiß', per100g: '90g', perPortion: '' },
      { name: 'Salz', per100g: '1,05g', perPortion: '' },
    ],
  },
  'glucosamin-pulver': {
    type: 'inhaltsstoffe',
    title: 'Inhaltsstoffe pro Tagesdosis (1.500mg)',
    rows: [
      { name: 'Glucosamin HCL', menge: '1.500mg', nrv: '/' },
    ],
  },
  'chondroitin-pulver': {
    type: 'inhaltsstoffe',
    title: 'Inhaltsstoffe pro Tagesdosis (1.000mg)',
    rows: [
      { name: 'Chondroitinsulfat', menge: '1.000mg', nrv: '/' },
    ],
  },
  'msm-pulver': {
    type: 'inhaltsstoffe',
    title: 'Inhaltsstoffe pro Tagesdosis (4g)',
    rows: [
      { name: 'Methylsulfonylmethan', menge: '4g', nrv: '/' },
    ],
  },
  'omega-3-softgels': {
    type: 'inhaltsstoffe',
    title: 'Inhaltsstoffe pro Tagesdosis (2 Kapseln)',
    rows: [
      { name: 'Omega 3 Fettsäuren', menge: '2.000mg', nrv: '/' },
      { name: 'davon EPA', menge: '360mg', nrv: '/', isSubItem: true },
      { name: 'davon DHA', menge: '240mg', nrv: '/', isSubItem: true },
      { name: 'Vitamin E', menge: '2.6mg', nrv: '22%' },
    ],
  },
  'vitamin-c-zink-elderberry-gummies': {
    type: 'inhaltsstoffe',
    title: 'Inhaltsstoffe pro 2 Stück (6g)',
    rows: [
      { name: 'Vitamin C', menge: '90 mg', nrv: '112%' },
      { name: 'Schwarzer Holunderbeerextrakt', menge: '100 mg', nrv: '/' },
      { name: 'Zink', menge: '7,5 mg', nrv: '75%' },
    ],
  },
};

interface NutritionTableProps {
  handle: string;
}

export const NutritionTable = ({ handle }: NutritionTableProps) => {
  const data = nutritionData[handle];
  
  if (!data) {
    return (
      <div className="text-muted-foreground">
        <p>Hochwertige Inhaltsstoffe in Premium-Qualität, laborgeprüft und ohne unnötige Zusatzstoffe.</p>
        <p className="mt-2">Hergestellt in Deutschland nach höchsten Qualitätsstandards (HACCP-zertifiziert).</p>
      </div>
    );
  }

  if (data.type === 'naehrwerte') {
    return (
      <div className="space-y-4">
        {data.introText && (
          <p className="text-muted-foreground mb-4">{data.introText}</p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                  Nährwerte
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                  pro 100g
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
                    {row.name}
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
          Hergestellt in Deutschland nach höchsten Qualitätsstandards (HACCP-zertifiziert).
        </p>
      </div>
    );
  }

  // Inhaltsstoffe table
  return (
    <div className="space-y-4">
      {data.title && (
        <p className="font-semibold text-foreground mb-2">{data.title}</p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                Inhaltsstoff
              </th>
              <th className="text-center py-3 px-4 font-semibold text-foreground border-b border-border">
                Menge
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
                  {row.name}
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
        *Prozent der Nährstoffbezugswerte (NRV) laut Verordnung (EU) Nr. 1169/2011
      </p>
      <p className="text-xs text-muted-foreground">
        Hergestellt in Deutschland nach höchsten Qualitätsstandards (HACCP-zertifiziert).
      </p>
    </div>
  );
};
