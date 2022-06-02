export interface rteCumplimiento {
    id_transaccion_sc:   number;
    codigo_afiliado:     string;
    cuenta_afectada:     number;
    filialac:            string;
    id_cliente:          string;
    name:                string;
    origen_fondos:       string;
    transaccion:         string;
    fecha_operacion:     Date;
    monto_transaccion:   number;
    filial:              string;
    colaborador_usuario: string;
    observaciones:       string;
}
