export interface ddCumplimiento {
    id_diligencia:       number;
    name:                string;
    id_no_afiliado:      string;
    parentesco:          string;
    filial:              string;
    codigo_afiliado:     string;
    cuenta_afectada:     number;
    origen_fondos:       string;
    razon_operacion:     string;
    transaccion:         string;
    monto_transaccion:   number;
    fecha_operacion:     Date;
    colaborador_usuario: string;
    observaciones:       string;
}