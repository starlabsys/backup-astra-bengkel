import { Pagination, Table } from "@nextui-org/react";
import { MdDelete, MdInfo, MdModeEditOutline } from "react-icons/md";


interface InterfaceHeader {
    name : string;
    label : string;
}


interface Interface {
    header : InterfaceHeader[];
    data : any[];
    loading : boolean;
    totalPage : number;
    changePage? : (( page : number ) => void) | undefined;
    updated? : (( data : any ) => void) | undefined;
    info? : (( data : any ) => void) | undefined;
    delete? : (( data : any ) => void) | undefined;
    page : number;
}

export const ITableData = ( props : Interface ) => {


    const bodyData = ( data : any, index : number ) => {
        return props.header.map( ( dataHeader, indexHeader ) => {
            switch ( dataHeader.name ) {
                case "#": {
                    return <Table.Cell key = { dataHeader.label + index + indexHeader + `${ data[ dataHeader.name ] }` + '#' }>
                        { index + 1 + props.page * 10 }
                    </Table.Cell>
                }
                case "action": {
                    return <Table.Cell key = { dataHeader.label + index + indexHeader + `${ data[ dataHeader.name ] }` + 'action' }>
                        <div className = "flex gap-3">
                            {
                                props.info !== undefined ? <MdInfo
                                    size = { 25 }
                                    color = { "#0E90FF" }
                                    className = { `cursor-pointer` }
                                    onClick = { () => {
                                        // @ts-ignore
                                        return props.info( data ) !== undefined ? props.info( data ) : undefined
                                    } }
                                /> : null
                            }
                            {
                                props.updated !== undefined ? <MdModeEditOutline
                                    size = { 25 }
                                    color = { "#F0B900" }
                                    className = { `cursor-pointer` }
                                    onClick = { () => {
                                        // @ts-ignore
                                        return props.updated( data ) !== undefined ? props.updated( data ) : undefined
                                    } }
                                /> : null
                            }
                            {
                                props.delete !== undefined ? <MdDelete
                                    size = { 25 }
                                    color = { "#E21B1B" }
                                    className = { `cursor-pointer` }
                                    onClick = { () => {
                                        // @ts-ignore
                                        return props.delete( data ) !== undefined ? props.delete( data ) : undefined
                                    } }
                                /> : null
                            }
                        </div>
                    </Table.Cell>
                }
                default: {
                    return <Table.Cell key = { dataHeader.label + index + indexHeader + `${ data[ dataHeader.name ] }` }>
                        { `${ data[ dataHeader.name ].toString() }` }
                    </Table.Cell>
                }
            }
        } );
    }

    return (
        <>
            <Table
                lined
                headerLined
                shadow = { false }
                bordered = { true }
                border = { 0 }
                selectionMode = { "single" }
                aria-label = "Example static collection table"
                css = { {
                    height : "auto",
                    minWidth : "100%"
                } }
            >
                <Table.Header>
                    {
                        props.header.map( ( data, index ) => {
                            return <Table.Column key = { index }>{ data.label }</Table.Column>
                        } )
                    }
                </Table.Header>
                <Table.Body
                    loadingState = { props.loading ? "loading" : "filtering" }
                >
                    { props.data.map( ( data : any, index ) => {
                        return (
                            <Table.Row key = { index } textValue = { "a" }>

                                {
                                    bodyData( data, index )
                                }
                            </Table.Row>
                        );
                    } ) }
                </Table.Body>
            </Table>
            <Pagination total = { props.totalPage } onChange = { props.changePage }/>
        </>
    );
}


