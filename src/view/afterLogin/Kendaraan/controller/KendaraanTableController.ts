import KendaraanServices from "../../../../domain/services/KendaraanServices/KendaraanServices";
import { useContext, useEffect, useState } from "react";
import { InterfaceKendaraan } from "../interfaces/InterfaceKendaraan";
import { IAlertDialogContext } from "../../../../component/IAlert/IAlertDialog";


const KendaraanTableController = () => {
    const [ loading, setLoading ] = useState( false );
    const [ kendaraan, setKendaraan ] = useState<InterfaceKendaraan[]>( [] as InterfaceKendaraan[] );
    const context = useContext( IAlertDialogContext );
    const getDataKendaraan = async () => {
        setLoading( true )
        const resp = await KendaraanServices.getDataKendaraan( context )
        if ( resp.message === 'success' ) {
            const data : [] = resp.data
            setKendaraan( data.map( ( item : any, index ) => {
                return {
                    id : item.id,
                    noPolisi : item.no_polisi,
                    noMesin : item.no_mesin,
                    customer : item.tipe_coming_customer,
                    status : '',
                    type : item.kode_tipe_unit,
                    warna : '',
                    noRangka : item.no_rangka,
                    tahunRakit : item.tahun_motor
                }
            } ) )
            // setLoading(false)
        }
        setLoading( false )
    }

    useEffect( () => {
        getDataKendaraan().then( () => {
        } )
        return () => {
        }
    }, [] )

    return {
        kendaraan,
        loading
    }
}
export default KendaraanTableController
