import IBreadcrumbs from "../../../../component/IBreadcrumbs/IBreadcrumbs";
import ITitleMd from "../../../../component/ITitle/ITitleMd";
import { ITextFieldDefault } from "../../../../component/ITextField/ITextField";
import IButton from "../../../../component/IButton/IButton";
import { ITableData } from "../../../../component/ITable/ITableNextUI";
import { GetDataMekanik } from "./ViewModel/getDataMekanik";
import { useRouter } from "next/router";


const MekanikView = () => {
    const getDataMekanik = GetDataMekanik();
    const route = useRouter()

    return <div className = { `grid gap-5` }>
        <IBreadcrumbs title = { 'Karyawan' } subtitle = { 'master-data/karyawan' }/>
        <div className = { `bg-white rounded-lg w-full p-5 grid gap-5` }>
            <ITitleMd title = { 'List Data Karyawan' }/>
            <div className = { `grid gap-5` }>
                <div className = { `w-full grid gap-5 tablet:flex tablet:place-content-between tablet:place-items-end` }>
                    <div className = { `w-full tablet:w-6/12` }>
                        <ITextFieldDefault type = { 'text' }
                                           label = { 'Cari' }
                                           onEnter = { 'enter' }
                                           placeholder = { 'Cari Karyawan' }/>
                    </div>
                    <div>
                        <IButton size = { 'medium' } status = { "success" } onClick = { () => {
                            route.push( '/master-data/karyawan/tambah-karyawan' ).then( () => {
                            } )
                        } }>
                            + Tambah Mekanik
                        </IButton>
                    </div>
                </div>
            </div>
            {
                tableData()
            }
        </div>
    </div>


    function tableData() {
        return <ITableData page = { 0 }
                           totalPage = { 10 }
                           loading = { false }
                           changePage = { index => {
                           } }
                           info = { () => {
                           } }
                           updated = { () => {
                           } }
                           header = { [
                               {
                                   label : '#',
                                   name : '#',
                               },
                               {
                                   label : 'Nama',
                                   name : 'nama',
                               },
                               {
                                   label : 'Alamat',
                                   name : 'alamat',
                               },
                               {
                                   label : 'No. Telp',
                                   name : 'no_telp',
                               },
                               {
                                   label : 'Action',
                                   name : 'action',
                               }
                           ] }
                           data = { [
                               {
                                   nama : 'Karyawan 1',
                                   alamat : 'Jl. Mekan',
                                   no_telp : '08123456789'
                               },
                               {
                                   nama : 'Karyawan 2',
                                   alamat : 'Jl. Mekanx',
                                   no_telp : '08123456781'
                               },
                           ] }/>
    }
}

export default MekanikView
