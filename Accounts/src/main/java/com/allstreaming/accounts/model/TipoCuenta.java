package com.allstreaming.accounts.model;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table (name="tipoCuenta")
public class TipoCuenta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String nombre;
	
	@OneToMany(mappedBy="tipoCuenta", cascade= CascadeType.ALL)
	private Set <Cuenta> cuentas= new HashSet<>();
	
	/*public TipoCuenta() {
		
	}
	
	
	public TipoCuenta(String nombre) {
		super();
		this.nombre = nombre;
	}
*/

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public Set<Cuenta> getCuentas() {
		return cuentas;
	}
	
	public void setCuentas(Set<Cuenta> cuentas) {
		this.cuentas = cuentas;
		for (Cuenta cuenta : cuentas) {
			cuenta.setTipoCuenta(this);
		}
	}
	
}
