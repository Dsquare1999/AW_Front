import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmissionPage from "../../primaryMarket/pages/EmissionPage";
import IndicatorPage from "../../primaryMarket/pages/IndicatorPage";
import HistoricPage from "../../primaryMarket/pages/HistoricPage";


const BondDetailPage = () => {
  return (
    <Tabs className="w-full">
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
        <EmissionPage />
      </TabsContent>
      <TabsContent value="indicateur">
        <IndicatorPage />
      </TabsContent>
      <TabsContent value="historique">
        <HistoricPage />
      </TabsContent>
    </Tabs>
  );
};

export default BondDetailPage;
