
import {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { TabMenu } from 'primereact/tabmenu';
import { Chart } from 'primereact/chart';
import { FaWater, FaLightbulb, FaFaucet, FaHome } from "react-icons/fa"; 
import { MdFamilyRestroom} from "react-icons/md";
import {ENERGIA_FORMAL} from './api/data'
const TOTAL_FAMILIAS = 21422;
const TOTAL_FAMILIAS_RENABAP =  10186;

const items = [
  {label: 'Familias', icon: MdFamilyRestroom },
  {label: 'Energia', icon: FaLightbulb},
  {label: 'Efluentes', icon: FaWater},
  {label: 'Agua', icon: FaFaucet },
  {label: 'Situacion dominial', icon: FaHome}
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [chartData] = useState({
    labels: ['Renabap', 'No renabap',],
    datasets: [
        {
            data: [TOTAL_FAMILIAS_RENABAP, TOTAL_FAMILIAS - TOTAL_FAMILIAS_RENABAP],
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",
            ],
            hoverBackgroundColor: [
                "#64B5F6",
                "#81C784",
                "#FFB74D"
            ]
        }
    ]
});

const lightOptions = {
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    }
};

useEffect(() => {
  console.log(ENERGIA_FORMAL)
}, [])

  return (
    <div >
      <Head>
        <title>Graficos ReNaBaP - Presidente Peron</title>
        <meta name="description" content="Graficos de datos del Registro Nacional de Barrios Populares del municipio Presidente Peron" />
        <link rel="icon" href="/iconNA.png" />
      </Head>

      <main  className="w-full" style={{height: '100vh'}}>
      <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>
      <div className="max-w-4xl justify-center "> 
      <Chart type="pie" data={chartData} options={lightOptions} className="" />
      </div>
</main>
    </div>
  )
}
// Graficos:
// - Total de familias viviendo en barrios populares: RENABAP/ sobre total de familias 
// - Energia electrica: conexion formal con medidor/conexion irregular a la red
// -efluentes cloacales: Desagüe a cámara séptica y pozo ciego/ Red cloacal conectada a la red pluvial
// -Agua corriente: Bomba de agua de pozo domiciliaria/Conexión irregular a la red de agua
// -Situacion Dominial:Ninguna seguridad en la tenencia/Boleto de compra-venta

// Total de familias en Peron: 21.422 
// Total de familias en barrios populares en Peron: 10.186