
import {useState, useEffect, useMemo} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { TabMenu } from 'primereact/tabmenu';
import { Chart } from 'primereact/chart';
import { FaWater, FaLightbulb, FaFaucet, FaHome } from "react-icons/fa"; 
import { MdFamilyRestroom} from "react-icons/md";
import {ENERGIA, AGUA, EFLUENTES, SITUACION_DOMINIAL, RENABAP} from './api/data'
import {ReactECharts, ReactEChartsProps} from '../components/Echarts'



const colors ={ 
  backgroundColor: [
  "#42A5F5",
  "#66BB6A",
  "#FFA726",
  "#EF5350",
  "#AB47BC",
],
hoverBackgroundColor: [
  "#64B5F6",
  "#81C784",
  "#FFB74D",
  "#EF9A9A",
  "#BA68C8",
]}
const option: ReactEChartsProps["option"] ={
  toolbox: {
    bottom: 0,
    show: true,
    feature: {
      saveAsImage: {
        show: true,
        title: "Guardar como imagen",
        type: "png",
        name: "myChart",
        excludeComponents: ["toolbox"],
        pixelRatio: 2,

      },
    },
  },
  // title: {
  //   text: 'Referer of a Website',
  //   subtext: 'Fake Data',
  //   right: '10%'
  // },
  tooltip: {
    trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
      //   { value: 1048, name: 'Search Engine' },
      //   { value: 735, name: 'Direct' },
      //   { value: 580, name: 'Email' },
      //   { value: 484, name: 'Union Ads' },
      //   { value: 300, name: 'Video Ads',label: { show: true, position: 'outside', formatter:'{a} - {d}%' } },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
export default function Home() {
  const items = useMemo(()=>([
    {label: 'Familias', icon: MdFamilyRestroom, data: RENABAP },
    {label: 'Energia', icon: FaLightbulb, data: ENERGIA },
    {label: 'Efluentes', icon: FaWater, data: EFLUENTES },
    {label: 'Agua', icon: FaFaucet, data: AGUA },
    {label: 'Situacion dominial', icon: FaHome, data: SITUACION_DOMINIAL },
  ]), []);

  const [activeIndex, setActiveIndex] = useState(0);

  const [chartData, setChartData] = useState(option);


useEffect(() => {
  console.log(SITUACION_DOMINIAL)
  const data = Object.entries(items[0].data)?.map(([a ,b]:[string, unknown])=>({value: b, name: a}))
  setChartData(prev=>({
    ...prev,
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '70%',
        label: { show: true, position: 'outside', formatter:'{b} - {d}%' },
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  
  }))
}, [])
interface Item {
  index: number;
  value: any;
}

const onTabChange = (e: Item ) => {
  const data:Array<{name: string, value: number}> = Object.entries(e.value.data)?.map(([a ,b]:[string, number])=>({value: b, name: a}))
  setChartData(prev=>({
    ...prev,
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '70%',
        label: { show: true, position: 'outside', formatter:'{b} - {d}%' },
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  
  }))
  setActiveIndex(e.index);
}

  return (
    <div >
      <Head>
        <title>Graficos ReNaBaP - Presidente Peron</title>
        <meta name="description" content="Graficos de datos del Registro Nacional de Barrios Populares del municipio Presidente Peron" />
        {/* <link rel="icon" href="/iconNA.png" /> */}
      </Head>

      <main  className="w-full" style={{height: '100vh'}}>
      <TabMenu model={items} activeIndex={activeIndex} onTabChange={onTabChange} />
      <div className="max-w-4xl justify-center "> 
      {/* <Chart type="pie" data={chartData} options={lightOptions} className="" /> */}
     <ReactECharts option={chartData}  style={{minHeight:'90vh', minWidth:'100vw', padding:'20px'}} theme="light" />
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