import React, { useEffect } from "react";
import { updateRuralProducerList } from "../../store/slices/ruralProducerSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import style from "./style.module.css";
import { GrFormEdit } from "react-icons/gr";
import { BiTrashAlt } from "react-icons/bi";
import IconButton from "../../shared/components/IconButton";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { RuralProducerType } from "../../shared/types/ruralProducer.type";
import { IoMdArrowRoundBack } from "react-icons/io";

const RuralProducerList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((store) => store.ruralProducer);
  const navigate = useNavigate();

  useEffect(() => {
    getRuralProducerList();
  }, []);

  const getRuralProducerList = async () => {
    const response = await fetch("/api/ruralProducer");
    const data = await response.json();
    dispatch(updateRuralProducerList(data));
  };

  const remove = async (ruralProducer: RuralProducerType) => {
    await fetch(`/api/ruralProducer/${ruralProducer.id}`, { method: "DELETE" });
    getRuralProducerList();
  };

  return (
    <div className="flex flex-col justify-start items-start w-[90vw] h-[90vh] max-w-[1500px] max-h-[700px] shadow-lg bg-[#444444] rounded-xl p-4">
      <header className="flex justify-between items-center w-full mb-4">
      <div className="flex items-center gap-2">
          <IconButton
            className="bg-[#222222]"
            action={() => navigate("/")}
            Icon={<IoMdArrowRoundBack className="w-5 h-5" />}
          />
          <span className="text-2xl font-bold">Produtores Rurais</span>
        </div>
        <Button label="Novo Produtor Rural" action={() => navigate("/form")} />
      </header>
      <div className="bg-[#444444] w-full h-full overflow-auto">
        {list.length ? (
          <table className={style.table}>
            <thead>
              <tr>
                <th className={`${style.th}`}>ID</th>
                <th className={`${style.th}`}>Documento</th>
                <th className={`${style.th}`}>Nome</th>
                <th className={`${style.th}`}>Fazenda</th>
                <th className={`${style.th}`}>Cidade</th>
                <th className={`${style.th}`}>Estado</th>
                <th className={`${style.th} min-w-[100px]`}>Total Hectares</th>
                <th className={`${style.th} min-w-[100px]`}>Área agricultável</th>
                <th className={`${style.th} min-w-[100px]`}>Área de vegetação</th>
                <th className={`${style.th} min-w-[150px]`}>Culturas plantadas</th>
                <th className={`${style.th} ${style.stickyRight}`}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((ruralProducer) => {
                return (
                  <tr className={style.tr} key={ruralProducer.id}>
                    <td className={style.td}>{ruralProducer.id}</td>
                    <td className={style.td}>{ruralProducer.document}</td>
                    <td className={style.td}>{ruralProducer.producerName}</td>
                    <td className={style.td}>{ruralProducer.farmName}</td>
                    <td className={style.td}>{ruralProducer.city}</td>
                    <td className={style.td}>{ruralProducer.state}</td>
                    <td className={style.td}>{ruralProducer.totalHectares}</td>
                    <td className={style.td}>
                      {ruralProducer.agriculturalHectares}
                    </td>
                    <td className={style.td}>
                      {ruralProducer.vegetationHectares}
                    </td>
                    <td className={style.td}>
                      {ruralProducer.cropsPlanted.map(crop => crop.label).join(', ')}
                    </td>
                    <td className={`${style.td} ${style.stickyRight}`}>
                      <div className="flex items-center gap-1">
                        <IconButton
                          className="bg-emerald-600"
                          action={() => {
                            navigate(`/form/${ruralProducer.id}`);
                          }}
                          Icon={<GrFormEdit className="w-5 h-5 stroke-white" />}
                        />
                        <IconButton
                          className="bg-red-500"
                          action={() => {
                            remove(ruralProducer);
                          }}
                          Icon={<BiTrashAlt className="w-4 h-4 fill-white" />}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-40">Nenhum produtor rural encontrado</div>
        )}
      </div>
    </div>
  );
};

export default RuralProducerList;
