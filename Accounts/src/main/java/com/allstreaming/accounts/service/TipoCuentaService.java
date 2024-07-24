package com.allstreaming.accounts.service;

import java.util.List;

import com.allstreaming.accounts.model.Cuenta;
import com.allstreaming.accounts.model.TipoCuenta;



public interface TipoCuentaService {

	public List<TipoCuenta>listCuentas();
	
	public void save(TipoCuenta tipoCuenta);
	
	public void delete(Long id);
	
	public TipoCuenta findTipoCuenta(TipoCuenta tipoCuenta);

	List<Cuenta> filtraCuentas(Long tipo_cuenta_id, String estado);


;}
