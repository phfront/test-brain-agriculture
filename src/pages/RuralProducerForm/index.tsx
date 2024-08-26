/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/components/Button";
import IconButton from "../../shared/components/IconButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";
import { SelectOption } from "../../shared/types/select.type";
import { CropsEnum } from "../../shared/enum/crops.enum";
import { validCnpj, validCpf } from "../../shared/utils/document";
import { States } from "../../shared/utils/state";
import SelectMultiple from "../../shared/components/SelectMultiple";

const cropsPlantedOptions: SelectOption[] = [
  { label: "Café", value: CropsEnum.Coffee },
  { label: "Milho", value: CropsEnum.Corn },
  { label: "Algodão", value: CropsEnum.Cotton },
  { label: "Soja", value: CropsEnum.Soybean },
  { label: "Cana de Açucar", value: CropsEnum.Sugarcane },
];

const RuralProducerForm: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  // form
  const [id, setId] = useState<number>(0);
  const [document, setDocument] = useState<string>("");
  const [producerName, setProducerName] = useState<string>("");
  const [farmName, setFarmName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [totalHectares, setTotalHectares] = useState<number>(0);
  const [agriculturalHectares, setAgriculturalHectares] = useState<number>(0);
  const [vegetationHectares, setVegetationHectares] = useState<number>(0);
  const [cropsPlanted, setCropsPlanted] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (params && Number(params.id)) {
      getRuralProducer(Number(params.id));
    }
  }, []);

  const errors: string[] = useMemo(() => {
    const _errors: string[] = [];

    if (
      !document ||
      !producerName ||
      !farmName ||
      !city ||
      !state ||
      !totalHectares ||
      !agriculturalHectares ||
      !vegetationHectares ||
      cropsPlanted.length === 0
    ) {
      _errors.push("Informe todos os campos");
    }

    if (document && !validCpf(document) && !validCnpj(document)) {
      _errors.push("Documento inválido, insira um CPF ou CNPJ");
    }

    if (
      Number(agriculturalHectares) + Number(vegetationHectares) >
      Number(totalHectares)
    ) {
      _errors.push(
        "A soma de área agrícultável e vegetação não deve ser maior que a área total da fazenda"
      );
    }

    return _errors;
  }, [
    document,
    producerName,
    farmName,
    city,
    state,
    totalHectares,
    agriculturalHectares,
    vegetationHectares,
    cropsPlanted,
  ]);

  const getRuralProducer = async (id: number) => {
    try {
      const response = await fetch(`/api/ruralProducer/${id}`);
      const data = await response.json();
      setId(data.id);
      setDocument(data.document);
      setProducerName(data.producerName);
      setFarmName(data.farmName);
      setCity(data.city);
      setState(data.state);
      setTotalHectares(data.totalHectares);
      setAgriculturalHectares(data.agriculturalHectares);
      setVegetationHectares(data.vegetationHectares);
      setCropsPlanted(data.cropsPlanted);
    } catch (err) {
      navigate("/list");
    }
  };

  const save = async () => {
    try {
      const url = id ? `/api/ruralProducer/${id}` : "/api/ruralProducer";
      const method = id ? "PUT" : "POST";
      await fetch(url, {
        method: method,
        body: JSON.stringify({
          document,
          producerName,
          farmName,
          city,
          state,
          totalHectares,
          agriculturalHectares,
          vegetationHectares,
          cropsPlanted,
        }),
      });
      navigate("/list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start w-[90vw] h-[90vh] max-w-screen-lg max-h-[700px] shadow-lg bg-[#444444] rounded-xl p-4 overflow-auto">
      <header className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center gap-2">
          <IconButton
            className="bg-[#222222]"
            action={() => navigate("/list")}
            Icon={<IoMdArrowRoundBack className="w-5 h-5" />}
          />
          <span className="text-2xl font-bold">Adicionar Produtor Rural</span>
        </div>
        <Button label="Salvar" action={save} disabled={errors.length > 0} />
      </header>

      <form className="grid grid-cols-3 gap-2 w-full">
        <Input
          value={document}
          setValue={setDocument}
          placeholder="Insira o Documento"
          label="Documento"
        />
        <Input
          value={producerName}
          setValue={setProducerName}
          placeholder="Insira o Nome do Produtor"
          label="Nome do Produtor"
        />
        <Input
          value={farmName}
          setValue={setFarmName}
          placeholder="Insira o Nome da Fazenda"
          label="Nome da Fazenda"
        />
        <Select
          value={state}
          setValue={(value) => setState(value as string)}
          options={States}
          placeholder="Selecione o estado"
          label="Estado"
        />
        <Input
          value={city}
          setValue={setCity}
          placeholder="Insira a Cidade"
          label="Cidade"
        />
        <SelectMultiple
          value={cropsPlanted}
          setValue={setCropsPlanted}
          options={cropsPlantedOptions}
          placeholder="Selecione as culturas"
          label="Culturas plantadas"
        />
        <Input
          type="number"
          value={totalHectares}
          setValue={setTotalHectares}
          placeholder="0.0"
          label="Área total em hectares da fazenda"
        />
        <Input
          type="number"
          value={agriculturalHectares}
          setValue={setAgriculturalHectares}
          placeholder="0.0"
          label="Área agricultável em hectares"
        />
        <Input
          type="number"
          value={vegetationHectares}
          setValue={setVegetationHectares}
          placeholder="0.0"
          label="Área de vegetação em hectares"
        />
      </form>

      <div className="flex flex-col items-start gap-1 mt-2">
        {errors.map((err, i) => (
          <div key={i} className="bg-[#b93535] px-2 py-1 rounded-md">
            {err}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RuralProducerForm;
