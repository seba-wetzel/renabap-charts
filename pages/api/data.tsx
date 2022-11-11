import datos from '../../utils/datos-renabap-peron.json'

const TOTAL_FAMILIAS = 21422;
const TOTAL_FAMILIAS_RENABAP =  10186;

export const ENERGIA_FORMAL = datos.map(
    (item) => item["Energía eléctrica"]
)