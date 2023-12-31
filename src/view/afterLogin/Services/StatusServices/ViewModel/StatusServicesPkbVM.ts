import { useContext, useEffect, useState } from "react";
import PkbRepository from "../../../../../domain/repository/pkb/PkbRepository";
import { IAlertDialogContext } from "../../../../../core/utils/error/IAlertDialog";
import { ILoadingContext } from "../../../../../component/ILoading/ILoading";
import { useRouter } from "next/router";
import {
    InterfaceAddDataServices,
    ListOfPekerjaan
} from "../../../../../domain/repository/pkb/interface/InterfaceAddDataServices";
import FormatDate from "../../../../../utils/format/formatDate";
import { ListOfPekerjaanModel, ModelAddServices } from "../../interface/InterfaceAddServices";
import Currency from "../../../../../utils/format/currency";
import { InterfaceListSparePartPKB } from "../../interface/interfaceListSparepartPKB";
import { DataModelDetailPKB, ListOfPekerjaanModelDetailPKB } from "../../../../../domain/models/Pkb/ModelDetailPKB";
import { InterfaceDetailPkb } from "../../interface/InterfaceDetailPkb";
import { InterfacePropsDropDown } from "../../../../../component/ITextField/IDropDown";
import VendorRepository from "../../../../../domain/repository/vendor/VendorRepository";
import { ListOfVendor } from "../../../../../domain/models/Vendor/ModelListVendor";
import ParameterSparepartRepository
    from "../../../../../domain/repository/parameter/sparepart/ParameterSparepartRepository";
import { ListofSparePartParameter } from "../../../../../domain/models/MasterDropDown/ModelParameterListSparepart";
import { ParameterDetailSparepart } from "../../../../../domain/models/MasterDropDown/ModelParameterDetailSparepart";
import { InterfaceDataSparepart } from "../../interface/InterfaceDataSparepart";
import { InterfacePemilik } from "../../interface/InterfacePemilik";
import { InterfaceAddJasaPKB } from "../../interface/InterfaceAddJasaPKB";
import { DataModelDetailJasa } from "../../../../../domain/models/Jasa/ModelDetailJasa";
import JasaRepository from "../../../../../domain/repository/jasa/JasaRepository";
import { ListofJasa } from "../../../../../domain/models/Jasa/ModelJasa";
import { EnumDataListMekanik } from "../../../../../utils/enum/EnumDataListMekanik";
import ParameterMekanikRepository from "../../../../../domain/repository/parameter/mekanik/ParameterMekanikRepository";
import { ListDropDownMekanikServices } from "../../../../../domain/models/MasterDropDown/ModelDropDownMekanikServices";
import GudangRepository from "../../../../../domain/repository/parameter/getGudang/GudangRepository";
import { ListOfGudangModel } from "../../../../../domain/models/MasterDropDown/ModelListGudang";
import { EnumSearchKendaraanPKB } from "../../../../../utils/enum/EnumSearchKendaraanPKB";
import { ListofKendaraanPKB } from "../../../../../domain/models/Pkb/ModelGetKendaraanServices";
import KendaraanRepository from "../../../../../domain/repository/kendaraan/KendaraanRepository";
import { ListofKendaraan } from "../../../../../domain/models/Kendaraan/ModelGetListKendaraan";


const StatusServicesPkbVM = ( id : number ) => {

    const context = useContext( IAlertDialogContext )
    const [ loading, setLoading ] = useState( false );
    const loadingLottie = useContext( ILoadingContext )

    const listTypeAntrian : InterfacePropsDropDown[] = [
        {
            id : 1,
            name : 'Regular',
            value : 'R'
        },
        {
            id : 2,
            name : 'Claim',
            value : 'C'
        },
        {
            id : 3,
            name : 'Fast Track',
            value : 'F'
        },
        {
            id : 4,
            name : 'Express',
            value : 'E'
        },
        {
            id : 5,
            name : 'Booking',
            value : 'B'
        },
    ]
    const listTypeKedatangan : InterfacePropsDropDown[] = [
        {
            id : 1,
            name : 'Walk-in AHASS / Non Promotion',
            value : 'Walk-in AHASS / Non Promotion'
        },
        {
            id : 2,
            name : 'Pit Express',
            value : 'Pit Express'
        },
        {
            id : 3,
            name : 'Pos Service',
            value : 'Pos Service'
        },
        {
            id : 4,
            name : 'Service Kunjung Motor/Emergency',
            value : 'Service Kunjung Motor/Emergency'
        },
    ]
    const listActivityCapacity : InterfacePropsDropDown[] = [
        {
            id : 1,
            name : 'Booking Service',
            value : 'Booking Service'
        },
        {
            id : 2,
            name : 'Happy Hour',
            value : 'Happy Hour'
        },
        {
            id : 3,
            name : 'Lain Lain',
            value : 'Lain Lain'
        },
    ]
    const listHubPemilik : InterfacePropsDropDown[] = [
        {
            id : 7,
            name : 'Pemilik',
            value : 'Pemilik'
        },
        {
            id : 6,
            name : 'Suami/istri',
            value : 'Suami/istri'
        },
        {
            id : 5,
            name : 'Anak',
            value : 'Anak'
        },
        {
            id : 4,
            name : 'Orang tua',
            value : 'Orang tua'
        },
        {
            id : 3,
            name : 'Saudara',
            value : 'Saudara'
        },
        {
            id : 2,
            name : 'Kerabat/teman',
            value : 'Kerabat/teman'
        },
        {
            id : 1,
            name : 'Supir/atasan',
            value : 'Supir/atasan'
        },
    ]
    const listAlasanAhass : InterfacePropsDropDown[] = [
        {
            id : 1,
            name : 'Inisiatif Sendiri',
            value : 'Inisiatif Sendiri'
        },
        {
            id : 2,
            name : 'SMS',
            value : 'SMS'
        },
        {
            id : 3,
            name : 'Telepon',
            value : 'Telepon'
        },
        {
            id : 4,
            name : 'Undangan',
            value : 'Undangan'
        },
        {
            id : 5,
            name : 'Sticker',
            value : 'Sticker'
        },
        {
            id : 6,
            name : 'Promosi',
            value : 'Promosi'
        },
        {
            id : 7,
            name : 'Buku KPB',
            value : 'Buku KPB'
        },
    ]
    const customerDatang : InterfacePropsDropDown[] = [
        {
            id : 1,
            name : 'Miliki',
            value : 'Miliki'
        },
        {
            id : 2,
            name : 'Bawa',
            value : 'Bawa'
        },
        {
            id : 3,
            name : 'Pakai',
            value : 'Pakai'
        },
    ]

    const [ listNoMesinNoPlat, setListNoMesinNoPlat ] = useState<InterfacePropsDropDown[]>( [] );
    const [ noMesinNoPlat, setNoMesinNoPlat ] = useState<InterfacePropsDropDown>();
    const [ searchKendaraan, setSearchKendaraan ] = useState<EnumSearchKendaraanPKB>( EnumSearchKendaraanPKB.mesin );

    const [ dataPkb, setDataPkb ] = useState<ModelAddServices>( {
        // hubunganDgPemilikID : listHubPemilik[ 0 ],
        // alasanIngatServiceID : listAlasanAhass[ 0 ],
    } as ModelAddServices );

    const [ listGudang, setListGudang ] = useState<InterfacePropsDropDown[]>( [] );
    const [ pemilik, setPemilik ] = useState<InterfacePemilik>();

    const getListGudang = async () => {
        const resp = await GudangRepository.getGudang( context, {
            action : 1,
            kodeGudang : '',
            alamat : '',
            namaGudang : '',
            kota : '',
        } )
        if ( resp !== null ) {
            setListGudang( resp.data.listOfGudangModel.map( ( item : ListOfGudangModel ) : InterfacePropsDropDown => {
                return {
                    id : item.id,
                    name : item.namaGudang,
                    value : item.kodeGudang,
                    add : item,
                } as InterfacePropsDropDown
            } ) )
        }
    }

    const getDataCustomerFromPlatNoMesin = async ( platNoMesin : string ) => {
        loadingLottie.openLoading( true );
        const resp = await PkbRepository.getKendaraanDetail( context, {
            action : 1,
            noMesin : platNoMesin,
            noPolisi : '',
        } )
        if ( resp !== null ) {
            setListNoMesinNoPlat( resp.data.listofKendaraan.map( ( item : ListofKendaraanPKB ) : InterfacePropsDropDown => {
                return {
                    id : item.id,
                    name : item.noMesin + ' - ' + item.namaPembawa,
                    value : item.idPelanggan.toString(),
                    add : item,
                }
            } ) )
        }
        loadingLottie.openLoading( false );
    }

    const getDataCustomerServices = async ( idPelanggan : InterfacePropsDropDown ) => {
        loadingLottie.openLoading( true );
        const resp = await PkbRepository.getCustomerDetail( context, {
            action : 1,
            id : Number( idPelanggan?.value ),
        } )
        if ( resp !== null ) {
            const dataKendaraan = idPelanggan?.add as ListofKendaraanPKB;
            const tahun = dataKendaraan?.tahunRakit?.toString().split( '-' )[ 0 ];
            setPemilik( ( prevState ) => {
                return {
                    ...prevState,
                    pemilik : resp.data.namaCustomer,
                    noHp : resp.data.noHp,
                    noMesin : dataKendaraan?.noMesin,
                    tahunMotor : tahun,
                } as InterfacePemilik
            } )
            setDataPkb( ( prevState ) => {
                return {
                    namaPembawa : dataKendaraan.namaPembawa,
                    nikPembawa : resp.data.noktp,
                    handphonePembawa : dataKendaraan.handphonePembawa,
                    kecamatanPembawa : dataKendaraan.kecamatanPembawa,
                    kotaPembawa : dataKendaraan.kotaPembawa,
                    alamatPembawaSaatIni : dataKendaraan.alamatPembawa,
                    alamatPembawa : dataKendaraan.alamatPembawa,
                    refEquipmentID : dataKendaraan.id,
                } as ModelAddServices
            } )
        }
        loadingLottie.openLoading( false );
    }

    const listCustomerData = async ( name : string ) => {
        loadingLottie.openLoading( true );
        const resp = await KendaraanRepository.getKendaraan( context, {
            action : 0,
            noPolisi : '',
            noMesin : "",
            namaCustomer : name,
            noRangka : "",
            pageNumber : 1,
            pageSize : 10,
            totalRow : 0,
            sortColumn : "ID",
            sortDirection : 0
        } )
        if ( resp !== null ) {
            setListNoMesinNoPlat( resp.data.listofKendaraan.map( ( item : ListofKendaraan ) : InterfacePropsDropDown => {
                return {
                    id : item.idPelanggan,
                    name : item.noMesin + ' - ' + item.namaPembawa,
                    value : item.idPelanggan.toString(),
                    add : item,
                }
            } ) )
        }
        loadingLottie.openLoading( false );
    }

    const [ getLatLng, setGetLatLng ] = useState( {
        lat : 0,
        lng : 0,
    } );

    const getLat = async () => {
        await navigator.geolocation.getCurrentPosition( ( position ) => {
            // setLat(position.coords.latitude)
            // setLng(position.coords.longitude)
            setDataPkb( ( prevState ) => {
                return {
                    ...prevState,
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude,
                } as ModelAddServices
            } )
            setGetLatLng( {
                lat : position.coords.latitude,
                lng : position.coords.longitude
            } )
        } )
    }

    const [ listJasa, setListJasa ] = useState<InterfacePropsDropDown[]>( [] );
    const [ addJasa, setAddJasa ] = useState<InterfaceAddJasaPKB>();

    const [ showAddJasa, setShowAddJasa ] = useState( false );
    const [ showSparepart, setShowSparepart ] = useState( false );

    const totalHargaJasa = ( hargaTambahan : number ) => {
        const harga = addJasa?.hargaPekerjaan ?? 0;
        const total = harga + hargaTambahan;
        setAddJasa( ( prevState ) => {
            return {
                ...prevState,
                totalHargaPekerjaan : total,
            } as InterfaceAddJasaPKB
        } )
    }

    const persentaseDiskon = ( persentase : number ) => {
        const harga = addJasa?.hargaPekerjaan ?? 0;
        const tambahan = addJasa?.tambahanHargaPekerjaan ?? 0;
        const diskon = (harga + tambahan) * (persentase / 100);
        const total = (harga + tambahan) - diskon;
        setAddJasa( ( prevState ) => {
            return {
                ...prevState,
                totalHargaPekerjaan : total,
                nilaiDiskon : diskon,
            } as InterfaceAddJasaPKB
        } )
    }

    const hargaDiskon = ( hargaDiskon : number ) => {
        const harga = addJasa?.hargaPekerjaan ?? 0;
        const tambahan = addJasa?.tambahanHargaPekerjaan ?? 0;
        const hargaDiskonResult = hargaDiskon / (harga + tambahan) * 100;
        const total = (harga + tambahan) - hargaDiskon;
        setAddJasa( ( prevState ) => {
            return {
                ...prevState,
                totalHargaPekerjaan : total,
                persentaseDiskon : hargaDiskonResult,
            } as InterfaceAddJasaPKB
        } )
    }

    const getJasa = async ( value : string ) => {
        loadingLottie.openLoading( true );
        const resp = await JasaRepository.getJasa( context, {
            page : 1,
            size : 10,
            kodeJasa : value,
            namaJasa : ''
        } )
        if ( resp !== null ) {
            setListJasa( resp.data.listofJasa.map( ( item : ListofJasa ) : InterfacePropsDropDown => {
                return {
                    id : item.id,
                    name : item.kodeJasa + ' - ' + item.namaJasa,
                    value : item.kodeJasa,
                    add : item as ListofJasa,
                }
            } ) )
        }
        loadingLottie.openLoading( false );
    }

    const [ jasa, setJasa ] = useState<DataModelDetailJasa>();

    const [ jasaBayar, setJasaBayar ] = useState( 0 );
    const [ jasaEstimasi, setJasaEstimasi ] = useState( 0 );

    const countJasaBayar = ( listOfPekerjaan : ListOfPekerjaanModel[] ) => {
        let total = 0;
        listOfPekerjaan.forEach( ( item ) => {
            total += Number( Currency.idrToString( item.totalJasa ) );
        } )
        setJasaBayar( total );
    }

    const countJasaEstimasi = ( listOfPekerjaan : ListOfPekerjaanModel[] ) => {
        let total = 0;
        listOfPekerjaan.forEach( ( item ) => {
            total += Number( item.flatRate );
        } )
        setJasaEstimasi( total );
    }

    const getDetailJasa = async ( idData : number ) => {
        loadingLottie.openLoading( true );
        const resp = await JasaRepository.detailJasa( context, {
            id : idData,
            action : 1
        } );
        if ( resp !== null ) {
            setJasa( resp.data )

        }
        loadingLottie.openLoading( false );
    }


    const [ listVendor, setListVendor ] = useState<InterfacePropsDropDown[]>( [] );

    const getVendor = async () => {
        loadingLottie.openLoading( true );
        const resp = await VendorRepository.getVendor( context, {
            action : 1,
            kodeVendor : '',
            namaVendor : '',
            alamat : "",
            kota : "",
            pageNumber : 1,
            pageSize : 10,
            totalRow : 0,
            sortColumn : "ID",
            sortDirection : 0
        } )
        if ( resp !== null ) {
            setListVendor( resp.data.listOfVendor.map( ( item : ListOfVendor ) : InterfacePropsDropDown => {
                return {
                    id : item.id,
                    name : item.kodeVendor + ' - ' + item.namaVendor,
                    value : item.kodeVendor,
                }
            } ) )
        }
        loadingLottie.openLoading( false );
    }

    const [ listMekanik, setListMekanik ] = useState<InterfacePropsDropDown[]>( [] );
    const [ listAdvisor, setListAdvisor ] = useState<InterfacePropsDropDown[]>( [] );
    const [ listInspector, setListInspector ] = useState<InterfacePropsDropDown[]>( [] );

    const getMekanik = async ( data : EnumDataListMekanik, namaMekanik : string ) => {
        const resp = await ParameterMekanikRepository.getListMekanik( context, {
            tipe : data,
            namaMekanik : namaMekanik,
        } )
        if ( resp !== null ) {
            if ( data === EnumDataListMekanik.mekanik ) {
                setListMekanik( resp.data.listDropDown.map( ( item : ListDropDownMekanikServices ) : InterfacePropsDropDown => {
                    return {
                        id : Number( item.nilai ),
                        name : item.label,
                        value : item.labelStatusKehadiran,
                        add : item as ListDropDownMekanikServices,
                    }
                } ) )
            }
            if ( data === EnumDataListMekanik.advisor ) {
                setListAdvisor( resp.data.listDropDown.map( ( item : ListDropDownMekanikServices ) : InterfacePropsDropDown => {
                    return {
                        id : Number( item.nilai ),
                        name : item.label,
                        value : item.labelStatusKehadiran,
                        add : item as ListDropDownMekanikServices,
                    }
                } ) )
            }
            if ( data === EnumDataListMekanik.inspector ) {
                setListInspector( resp.data.listDropDown.map( ( item : ListDropDownMekanikServices ) : InterfacePropsDropDown => {
                    return {
                        id : Number( item.nilai ),
                        name : item.label,
                        value : item.labelStatusKehadiran,
                        add : item as ListDropDownMekanikServices,
                    }
                } ) )
            }
        }
    }

    // const [ totalBayar, setTotalBayar ] = useState( '' );
    //
    // const countTotalBayar = () => {
    // }

    const [ listSparepart, setListSparepart ] = useState<InterfacePropsDropDown[]>( [] );
    const [ detailSparepart, setDetailSparepart ] = useState<ParameterDetailSparepart>();
    const [ listSparepartTable, setListSparepartTable ] = useState<InterfaceListSparePartPKB[]>( [] );
    const [ dataSparePart, setDataSparePart ] = useState<InterfaceDataSparepart>();

    const totalHargaSparePart = ( hargaTambahan : number ) => {
        const harga = Number( Currency.idrToString( dataSparePart?.hargaJual ?? '0' ) ) ?? 0;
        const jumlah = dataSparePart?.jumlah ?? 1
        const total = (harga + hargaTambahan);
        setDataSparePart( ( prevState ) => {
            return {
                ...prevState,
                totalHarga : total,
            } as InterfaceDataSparepart
        } )

    }

    const persentaseDiskonSparePart = ( persentase : number ) => {
        const harga = Number( Currency.idrToString( dataSparePart?.hargaJual ?? '0' ) ) ?? 0;
        const tambahan = dataSparePart?.tambahanHarga ?? 0;
        const diskon = (harga + tambahan) * (persentase / 100);
        const jumlah = dataSparePart?.jumlah ?? 1
        const total = ((harga + tambahan) - diskon);
        setDataSparePart( ( prevState ) => {
            return {
                ...prevState,
                totalHarga : total,
                nilaiDiskon : diskon,
            } as InterfaceDataSparepart
        } )
    }

    const JumlahTotalSparePart = ( jumlah : number ) => {
        if ( jumlah > 0 ) {
            const harga = Number( Currency.idrToString( dataSparePart?.totalHarga?.toString() ?? '0' ) );
            if ( harga > 0 ) {
                const total = (harga * jumlah);
                setDataSparePart( ( prevState ) => {
                    return {
                        ...prevState,
                        totalHarga : total,
                    } as InterfaceDataSparepart
                } )
            }
        }
        else {
            context.onError( true )
            context.giveMessage( 'Jumlah tidak boleh kurang dari 1' )
            context.setOpen( true )
            setDataSparePart( ( prevState ) => {
                return {
                    ...prevState,
                    jumlah : 1,
                } as InterfaceDataSparepart
            } )
        }
    }

    const hargaDiskonSparePart = ( hargaDiskon : number ) => {
        const harga = Number( Currency.idrToString( dataSparePart?.hargaJual ?? '0' ) ) ?? 0;
        const tambahan = dataSparePart?.tambahanHarga ?? 0;
        const hargaDiskonResult = hargaDiskon / (harga + tambahan) * 100;
        const jumlah = dataSparePart?.jumlah ?? 1
        const total = ((harga + tambahan) - hargaDiskon);
        setDataSparePart( ( prevState ) => {
            return {
                ...prevState,
                totalHarga : total,
                persentaseDiskon : hargaDiskonResult,
            } as InterfaceDataSparepart
        } )
    }

    const getListSparepart = async ( kodeSparepart : string, idGudang : number ) => {
        loadingLottie.openLoading( true )
        const resp = await ParameterSparepartRepository.getListSparepart( context, {
            action : 1,
            namaSparepart : "",
            kodeSparepart : kodeSparepart,
            idGudang : idGudang, //51,
        } )
        if ( resp !== null ) {
            setListSparepart( resp.data.listofSparePart.map( ( item : ListofSparePartParameter ) : InterfacePropsDropDown => {
                return {
                    id : item.id,
                    name : item.kodeSparepart + ' - ' + item.namaSparepart,
                    value : item.kodeSparepart,
                    add : item as ListofSparePartParameter,
                }
            } ) )
        }
        loadingLottie.openLoading( false )
    }

    const getDetailSparepart = async ( idSparepart : number, idGudang : number ) => {
        const resp = await ParameterSparepartRepository.getDetailSparepart( context, {
            action : 1,
            id : idSparepart,//60245,
            idGudang : idGudang //51
        } )
        if ( resp !== null ) {
            setDetailSparepart( resp?.data )
            setDataSparePart( {
                kodeJasa : 0,
                noRefJasa : resp?.data?.kodeSparepart + ' - ' + resp?.data?.namaSparepart,
                stock : resp?.data?.stok,
                namaMaterial : resp?.data?.namaSparepart,
                tambahanHarga : 0,
                hargaJual : Currency.stringToIdr( resp?.data?.hargaJual?.toString() ?? '0' ),
                persentaseDiskon : 0,
                nilaiDiskon : 0,
                jumlah : 1,
                totalHarga : resp.data.hargaJual,

                ack : resp?.data?.ack,
                idSparepart : resp?.data?.idSparepart,
                aktif : resp?.data?.aktif,
                barcode : resp?.data?.barcode,
                catatan : resp?.data?.catatan,
                etaTercepat : resp?.data?.etaTercepat,
                etaTerlama : resp?.data?.etaTerlama,
                grupSparepart : resp?.data?.grupSparepart,
                grupKodeAHM : resp?.data?.grupKodeAHM,
                hargaClaimOli : resp?.data?.hargaClaimOli,
                hargaLokal : resp?.data?.hargaLokal,
                hargaNasional : resp?.data?.hargaNasional,
                isHotLine : resp?.data?.isHotLine,
                kodeSparepart : resp?.data?.kodeSparepart,
                isOriginalPart : resp?.data?.isOriginalPart,
                message : resp?.data?.message,
                namaSparepart : resp?.data?.namaSparepart,
                rak : resp?.data?.rak,
                kategoriETD : resp?.data?.kategoriETD,
                namaLokal : resp?.data?.namaLokal,
                uom : resp?.data?.uom,
                nilaiKomisi : resp?.data?.nilaiKomisi,
                stok : resp?.data?.stok,
                pajakJual : resp?.data?.pajakJual,
                satuanKomisi : resp?.data?.satuanKomisi,
                tipeKomisi : resp?.data?.satuanKomisi
            } )
        }
    }

    const [ totalSparepart, setTotalSparepart ] = useState( 0 );

    const subBayar = ( totalJasa : number, totalSparepart : number ) => {
        // const total = totalJasa + totalSparepart;
        // setTotalBayarAll( total )
    }

    const route = useRouter()

    const [ detailPKB, setDetailPKB ] = useState<DataModelDetailPKB>();

    const getDetailPkb = async () => {
        const resp = await PkbRepository.getDetailPKB( context, {
            action : 1,
            id : id,
        } )
        if ( resp !== null ) {
            const detail = resp.data;
            setDetailPKB( resp.data )
            setListJasa( resp.data.listOfPekerjaan.map( ( item : ListOfPekerjaanModelDetailPKB ) => {
                setListSparepart( item.listOfMaterial.map( ( value : InterfaceListSparePartPKB ) => {
                    setTotalSparepart( ( prevState ) => {
                        return prevState + value.totalMaterial
                    } )
                    return {
                        id : value.refMaterialId,
                        name : value.kodeSparepart + ' - ' + value.namaMaterial,
                        value : value.kodeSparepart,
                        add : value as InterfaceListSparePartPKB,
                    } as InterfacePropsDropDown
                } ) )
                return {
                    id : item.refJobID,
                    name : item.kodeJasa + ' - ' + item.namaPekerjaan,
                    value : item.kodeJasa,
                    add : item as ListOfPekerjaanModelDetailPKB,
                } as InterfacePropsDropDown
            } ) )

            setDataPkb( {
                tanggal : detail.tanggal,
                pkbNo : detail.pkbNo,
                idPKB : detail.idPKB,
                refEquipmentID : detail.refEquipmentID,
                statusPKB : detail.statusPKB,
                jamKedatanganCustomer : detail.jamKedatanganCustomer,
                jamMasuk : detail.jamMasuk,
                uangMuka : detail.uangMuka,
                idGudang : listGudang.find( ( value ) => {
                    return value.id === detail.idGudang ? value : null
                } ) ?? {} as InterfacePropsDropDown,
                listOfPekerjaan : resp?.data?.listOfPekerjaan?.map( ( item : ListOfPekerjaanModelDetailPKB ) => {
                    return {
                        flatRate : item.flatRate ?? 0,
                        idJasa : item.refJobID ?? 0,
                        listOfMaterial : item.listOfMaterial ?? [],
                        namaPekerjaan : item.namaPekerjaan ?? '',
                        totalJasa : item.totalJasa?.toString() ?? '0',
                        labelisOPL : item.labelisOPL ?? false,
                        guid : item.guid ?? '',
                        hargaPekerjaan : item.hargaPekerjaan?.toString() ?? '',
                        isAdditionalPekerjaan : item.isAdditionalPekerjaan?.toString() ?? '',
                        isFreeService : item.isFreeService ?? false,
                        isEditable : item.isEditable ?? false,
                        isOPL : item.isOPL ?? false,
                        itemNo : item.itemNo ?? 0,
                        kodeJasa : item.kodeJasa ?? 0,
                        isShowDelete : item.isShowDelete ?? false,
                        kodeJasaAHM : item.kodeJasaAHM ?? '',
                        listOfMaterialHotline : item.listOfMaterialHotline ?? [],
                        markUpJasa : item.markUpJasa?.toString() ?? 0,
                        noBuku : item.noBuku ?? 0,
                        nilaiDiskon : item.nilaiDiskon?.toString() ?? '',
                        noClaimC2 : item.noClaimC2 ?? '',
                        nilaiDiskonJasa : item.nilaiDiskonJasa ?? 0,
                        pajakJasa : item.pajakJasa ?? 0,
                        pkbPekerjaanID : item.pkbPekerjaanID ?? 0,
                        persentaseDiskon : item.persentaseDiskon ?? 0,
                        persentaseDiskonJasa : item.persentaseDiskonJasa ?? 0,
                        refJobID : item.refJobID ?? 0,
                        vendorID : item.vendorID ?? 0,
                    } as ListOfPekerjaanModel
                } ),
                listOfMaterialHotline : [],
                kmSekarang : detail.kmSekarang,
                serviceAdvisorID : listAdvisor.find( ( value ) => {
                    return value.id === detail.serviceAdvisorID ? value : null
                } ) ?? {} as InterfacePropsDropDown,
                finalInspectorID : listInspector.find( ( value ) => {
                    return value.id === detail.finalInspectorID ? value : null
                } ) ?? {} as InterfacePropsDropDown,
                refMechanicID : listMekanik.find( ( value ) => {
                    return value.id === detail.refMechanicID ? value : null
                } ) ?? {} as InterfacePropsDropDown,
                kmBerikutnya : detail.kmBerikutnya,
                alasanIngatServiceID : listAlasanAhass.find( ( value ) => {
                    return value.id === detail.alasanIngatServiceID ? value : null
                } ) ?? {} as InterfacePropsDropDown,
                alamatPembawa : detail.alamatPembawa,
                hubunganDgPemilikID : listHubPemilik.find( ( value ) => {
                    return value.id === detail.hubunganDgPemilikID ? value : null
                } ) ?? {} as InterfacePropsDropDown,
                kotaPembawa : detail.kotaPembawa,
                alamatPembawaSaatIni : detail.alamatPembawaSaatIni,
                kecamatanPembawa : detail.kecamatanPembawa,
                handphonePembawa : detail.handphonePembawa,
                nikPembawa : detail.nikPembawa,
                namaPembawa : detail.namaPembawa,
                gejala : detail.gejala,
                keluhan : detail.keluhan,
                longitude : detail.longitude,
                jamEstimasiSelesai : detail.jamEstimasiSelesai,
                latitude : detail.latitude,
                noSTNK : detail.noSTNK,
                tipeComingCustomer : customerDatang.find( ( value ) => {
                    return value.value === detail.tipeComingCustomer ? value : null
                } ) ?? {} as InterfacePropsDropDown,
                indikatorBensin : detail.indikatorBensin,
                partBekasDibawaKonsumen : detail.partBekasDibawaKonsumen,
                svPKBReturnID : 0,
                pergantianPart : detail.pergantianPart,
                dealerSendiri : detail.dealerSendiri,
                activityCapacity : listActivityCapacity.find( ( value ) => {
                    return value.id === detail.activityCapacity ? value : null
                } ) ?? {} as InterfacePropsDropDown,
                tipeAntrian : listTypeAntrian.find( ( value ) => {
                    return value.value === detail.tipeAntrian ? value : null
                } ) ?? {} as InterfacePropsDropDown,
                noBuku : detail.bookingSource,
                noAntrian : detail.noAntrian,
                isPKBHotline : false,
                noClaimC2 : '',
                DataMotorkuX : [],
                isFrameNo : detail.isFrameNo,
                idPit : detail.idPit,
                action : detail.action,
                tipePKB : listTypeKedatangan.find( ( value ) => {
                    return value.id === detail.tipePKB ? value : null
                } ) ?? {} as InterfacePropsDropDown,
                isEngineNo : detail.isEngineNo,
                pkbRemove : [],
                jamProses : detail.jamProses,
                jamSelesai : detail.jamSelesai,
                kodeAntrian : detail.noAntrian,
            } )
            setPemilik( {
                noMesin : detail.noMesin,
                tahunMotor : detail.tahunRakit,
                pemilik : detail.namaPemilik,
                noHp : detail.handphonePemilik,
            } )
        }
    }

    const sendData = async () => {
        // const now = new Date();
        loadingLottie.openLoading( true )
        const sendData : InterfaceAddDataServices = {
            action : 1,
            idPKB : dataPkb.idPKB,
            pkbNo : dataPkb.pkbNo,
            refEquipmentID : dataPkb?.refEquipmentID ?? 0,
            statusPKB : dataPkb?.statusPKB ?? 0,
            tipePKB : dataPkb?.tipePKB?.id ?? 0,
            noAntrian : dataPkb?.noAntrian ?? '',
            kmSekarang : dataPkb?.kmSekarang ?? 0,
            kmBerikutnya : dataPkb?.kmBerikutnya ?? 0,
            namaPembawa : dataPkb?.namaPembawa ?? '',
            alamatPembawa : dataPkb?.alamatPembawa ?? '',
            alamatPembawaSaatIni : dataPkb?.alamatPembawaSaatIni ?? '',
            kotaPembawa : dataPkb?.kotaPembawa ?? '',
            handphonePembawa : dataPkb?.handphonePembawa ?? '',
            hubunganDgPemilikID : dataPkb?.hubunganDgPemilikID?.id ?? 0,
            alasanIngatServiceID : dataPkb?.alasanIngatServiceID?.id ?? 0,
            dealerSendiri : dataPkb?.dealerSendiri ?? false,
            keluhan : dataPkb?.keluhan ?? '',
            gejala : dataPkb?.gejala ?? '',
            pergantianPart : dataPkb?.pergantianPart ?? false,
            partBekasDibawaKonsumen : dataPkb?.partBekasDibawaKonsumen ?? false,
            refMechanicID : dataPkb?.refMechanicID?.id?.toString() ?? '',
            serviceAdvisorID : dataPkb?.serviceAdvisorID?.id?.toString() ?? '',
            finalInspectorID : dataPkb?.finalInspectorID?.id?.toString() ?? '',
            jamMasuk : FormatDate.dateSend2(),
            jamProses : dataPkb?.jamProses ?? '',
            jamSelesai : dataPkb?.jamSelesai ?? '',
            uangMuka : dataPkb?.uangMuka ?? 0,
            idGudang : dataPkb?.idGudang?.id ?? 0,
            idPit : dataPkb?.idPit ?? 0,
            listOfPekerjaan : dataPkb?.listOfPekerjaan?.map( ( item : ListOfPekerjaanModel ) : ListOfPekerjaan => {
                return {
                    guid : '',
                    pkbID : 0,
                    pkbPekerjaanID : 0,
                    itemNo : 0,
                    refJobID : item?.idJasa ?? 0,
                    nilaiDiskon : Number( Currency.idrToString( item.nilaiDiskon ?? '0' ) ) ?? 0,
                    nilaiDiskonJasa : Number( Currency.idrToString( item?.nilaiDiskonJasa?.toString() ?? '0' ) ) ?? 0,
                    persentaseDiskon : item.persentaseDiskon,
                    persentaseDiskonJasa : item.persentaseDiskonJasa,
                    totalJasa : Number( Currency.idrToString( item?.totalJasa ?? '0' ) ),
                    pajakJasa : item.pajakJasa,
                    hargaPekerjaan : Number( Currency.idrToString( item?.hargaPekerjaan ?? '0' ) ) ?? 0,
                    namaPekerjaan : item.namaPekerjaan,
                    isOPL : item.isOPL,
                    labelisOPL : item.isOPL ? 'Ya' : 'Tidak',
                    listOfMaterial : listSparepartTable.map( ( valueData ) : InterfaceListSparePartPKB => {
                        if ( valueData.pekerjaanID === item.idJasa ) {
                            return valueData
                        }
                        return {} as InterfaceListSparePartPKB
                    } ),
                    listOfMaterialHotline : [],
                    kodeJasa : item.kodeJasa,
                    idJasa : item.idJasa,
                    isShowDelete : item.isShowDelete,
                    isEditable : item.isEditable,
                    isFreeService : item.isFreeService,
                    flatRate : item.flatRate,
                    markUpJasa : Number( item.markUpJasa?.toString() ?? '0' ) ?? 0,
                    vendorID : item.vendorID,
                    noClaimC2 : item.noClaimC2,
                    noBuku : item.noBuku,
                    isAdditionalPekerjaan : Number( Currency.idrToString( item.isAdditionalPekerjaan ) ),
                }
            } ),
            listOfMaterialHotline : dataPkb?.listOfMaterialHotline ?? [],
            tanggal : FormatDate.dateSend2(),
            latitude : getLatLng.lat,
            longitude : getLatLng.lng,
            noSTNK : dataPkb?.noSTNK ?? '',
            indikatorBensin : dataPkb?.indikatorBensin ?? 0,
            svPKBReturnID : dataPkb?.svPKBReturnID ?? 0,
            kodeAntrian : dataPkb?.tipeAntrian?.value ?? '',
            tipeAntrian : dataPkb?.tipeAntrian?.value ?? '',
            activityCapacity : dataPkb?.activityCapacity?.id ?? 0,
            kecamatanPembawa : dataPkb?.kecamatanPembawa ?? '',
            pkbRemove : {
                listRemoveMaterial : [],
                listRemovePekerjaan : [],
            },
            tipeComingCustomer : dataPkb?.tipeComingCustomer?.value ?? '',
            isEngineNo : dataPkb?.isEngineNo ?? false,
            isFrameNo : dataPkb?.isFrameNo ?? false,
            isPKBHotline : dataPkb?.isPKBHotline ?? false,
            jamEstimasiSelesai : FormatDate.dateSend2(),
            jamKedatanganCustomer : FormatDate.dateSend2(),
            noClaimC2 : dataPkb?.noClaimC2 ?? '',
            noBuku : dataPkb?.noBuku ?? '',
            DataMotorkuX : {
                VoucherType : 0,
                VoucherValue : 0,
            },
        }

        // console.log( sendData )

        // console.log( dataPkb )

        const resp = await PkbRepository.addData( context, sendData )
        loadingLottie.openLoading( false )

    }


    useEffect( () => {
        if ( !isNaN( id ) ) {
            getListGudang();
            getLat();
            getVendor();
            getMekanik( EnumDataListMekanik.mekanik, '' )
            getMekanik( EnumDataListMekanik.advisor, '' )
            getMekanik( EnumDataListMekanik.inspector, '' )
            // getListSparepart();
            // getDetailSparepart();
            const date = new Date();
            const time = Date.now();
            // const tanggal =
            setDataPkb( ( prevState ) => {
                return {
                    ...prevState,
                    jamMasuk : FormatDate.stringToDateInput( date.toLocaleDateString() ),
                    jamKedatanganCustomer : FormatDate.getTimeNow( time ),
                    jamEstimasiSelesai : FormatDate.stringToDateInput( date.toLocaleDateString() ),
                    tanggal : FormatDate.nowDate()
                } as ModelAddServices
            } )
            getDetailPkb().then( () => {

            } )
        }
        else {
            route.back()
        }
        return () => {
        };
    }, [] );

    return {
        context,
        dataPkb,
        setDataPkb,
        sendData,
        // sendData,
        // noPolisiNoMesin, setNoPolisiNoMesin,
        pemilik,
        setPemilik,
        listTypeAntrian,
        listActivityCapacity,
        listGudang,
        listAlasanAhass,
        listHubPemilik,
        listTypeKedatangan,
        getDataCustomerFromPlatNoMesin,
        listNoMesinNoPlat,
        loading,
        getDataCustomerServices,
        noMesinNoPlat,
        setNoMesinNoPlat,
        searchKendaraan,
        setSearchKendaraan,
        listCustomerData,
        getJasa,
        listJasa,
        showAddJasa,
        setShowAddJasa,
        addJasa,
        setAddJasa,
        totalHargaJasa,
        persentaseDiskon,
        hargaDiskon,
        listVendor,
        jasa,
        setJasa,
        getDetailJasa,
        getMekanik,
        listMekanik,
        listAdvisor,
        listInspector,
        countJasaBayar,
        jasaBayar,
        jasaEstimasi,
        countJasaEstimasi,
        getListSparepart,
        getDetailSparepart,
        listSparepart,
        setListSparepart,
        detailSparepart,
        setDetailSparepart,
        showSparepart, setShowSparepart,
        listSparepartTable, setListSparepartTable,
        dataSparePart, setDataSparePart,
        totalHargaSparePart, persentaseDiskonSparePart,
        hargaDiskonSparePart, JumlahTotalSparePart, subBayar, totalSparepart, setTotalSparepart, customerDatang
    }
}
export default StatusServicesPkbVM
