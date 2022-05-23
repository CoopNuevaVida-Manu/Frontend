export interface diligenciaNoAfiliado {
    id_diligencia?:       number;
    id_no_afiliado:      string;
    id_parentesco:       number;
    id_filial:           number;
    codigo_afiliado:     string;
    cuenta_afectada:     number;
    id_origen_fondos:    number;
    id_razon_operacion:  number;
    id_transaccion:      number;
    monto_transaccion:   number;
    fecha_operacion:     string;
    id_cajero_operacion: number;
    observaciones:       string;
}