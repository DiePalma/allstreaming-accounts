package com.allstreaming.accounts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstreaming.accounts.model.TipoCuenta;

public interface TipoCuentaRepository extends JpaRepository<TipoCuenta, Long>{

	/* Utilizando una Query desde Repository e implementandola en un Service, se puede realizar la consulta SQL
	 * correspondiente a la búsqueda de cuenta por tipo que estén disponibles.
	@Query(value= "select * from tipoCuenta t inner join t.cuenta c where c ", nativeQuery= true)
	List<TipoCuenta> filtraCuentasDisponibles();
	*/
}
