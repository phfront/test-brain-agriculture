import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { DashboardType } from "../../shared/types/dashboard.type";
import PieChart from "../../shared/components/PieChart";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<DashboardType>({
    totalFarm: 0,
    totalHectare: 0,
    statePieChart: [],
    culturePieChart: [],
    landUsePieChart: [],
  });

  useEffect(() => {
    getRuralProducerList();
  }, []);

  const getRuralProducerList = async () => {
    const response = await fetch("/api/dashboard");
    const data = await response.json();
    setDashboard(data);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
      <div className="bg-[#333] min-h-14 flex justify-between items-center px-4 rounded-lg">
        <span className="text-2xl">Teste - Brain Agriculture</span>
        <Button
          label="Listagem"
          action={() => {
            navigate("/list");
          }}
        />
      </div>
      <div className={style.dashboard}>
        <div className={`${style.card} ${style.cardTotal}`}>
          <p>Total de fazendas em quantidade</p>
          <h1>{dashboard.totalFarm}</h1>
        </div>
        <div className={`${style.card} ${style.cardTotal}`}>
          <p>Total de fazendas em hectares (área total)</p>
          <h1>{dashboard.totalHectare}</h1>
        </div>
        <div className={`${style.card} ${style.cardChart}`}>
          <p>Gráfico de pizza por estado.</p>
          <PieChart data={dashboard.statePieChart} />
        </div>
        <div className={`${style.card} ${style.cardChart}`}>
          <p>Gráfico de pizza por cultura.</p>
          <PieChart data={dashboard.culturePieChart} />
        </div>
        <div className={`${style.card} ${style.cardChart}`}>
          <p>
            Gráfico de pizza por uso de solo (Área agricultável e vegetação)
          </p>
          <PieChart data={dashboard.landUsePieChart} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
