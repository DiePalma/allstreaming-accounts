package com.allstreaming.accounts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstreaming.accounts.model.Cuenta;

public interface CuentaRepository extends JpaRepository<Cuenta, Long> {

	@Query("SELECT tipo.id as idTipo, c.correo as cuenta FROM Cuenta c JOIN c.tipoCuenta tipo WHERE c.estado = 'Disponible'")
	List<Cuenta> filtraCuentasDisponibles();
	
}
