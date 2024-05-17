import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmissionPage from "../../primaryMarket/pages/EmissionPage";
import IndicatorPage from "../../primaryMarket/pages/IndicatorPage";
import HistoricPage from "../../primaryMarket/pages/HistoricPage";


const BondDetailPage = ({ opened = false, size = 'small' } : { opened ?: boolean; size ?: 'small'|'medium'|'large'}) => {
  return (
    <Tabs defaultValue={opened? 'emission' : ''} className="w-full">
      <TabsList className="w-full flex">
        <TabsTrigger className="flex-1" value="emission">
          Emission
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="indicateur">
          Indicateur
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="historique">
          Historique
        </TabsTrigger>
      </TabsList>
      <TabsContent value="emission">
        <EmissionPage size={size} />
      </TabsContent>
      <TabsContent value="indicateur">
        <IndicatorPage size={size} />
      </TabsContent>
      <TabsContent value="historique">
        <HistoricPage size={size} />
      </TabsContent>
    </Tabs>
  );
};

export default BondDetailPage;
