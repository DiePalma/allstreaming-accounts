package com.allstreaming.accounts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.allstreaming.accounts.model.Cuenta;

public interface CuentaRepository extends JpaRepository<Cuenta, Long> {

}
