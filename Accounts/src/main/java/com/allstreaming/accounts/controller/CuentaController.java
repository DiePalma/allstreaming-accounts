package com.allstreaming.accounts.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.allstreaming.accounts.model.Cuenta;
import com.allstreaming.accounts.model.TipoCuenta;
import com.allstreaming.accounts.repository.CuentaRepository;
import com.allstreaming.accounts.repository.TipoCuentaRepository;

@RestController
@RequestMapping("/cuenta")
public class CuentaController {
	
	@Autowired
	private CuentaRepository cuentaRepository;
	
	@Autowired
	private TipoCuentaRepository tipoCuentaRepository;
	
	public CuentaController (CuentaRepository cuentaRepository) {
		this.cuentaRepository= cuentaRepository;
	}
	
	
	@GetMapping
	public List<Cuenta> getCuentas(){
		return cuentaRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Cuenta getCuenta(@PathVariable Long id) {
		return cuentaRepository.findById(id).orElseThrow(RuntimeException::new);
	}
	
	@PostMapping
    public ResponseEntity<Cuenta> createCuenta(@RequestBody Cuenta cuenta) throws URISyntaxException {
        Optional<TipoCuenta> tipoCuentaOptional= tipoCuentaRepository.findById(cuenta.getTipoCuenta().getId());
       if(!tipoCuentaOptional.isPresent()) {
        	return ResponseEntity.unprocessableEntity().build();
        }
        cuenta.setTipoCuenta(tipoCuentaOptional.get());
		Cuenta savedCuenta = cuentaRepository.save(cuenta);
        return ResponseEntity.created(new URI("/cuenta/" + savedCuenta.getId())).body(savedCuenta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cuenta> updateCuenta(@PathVariable Long id, @RequestBody Cuenta cuenta) {
        Optional<TipoCuenta> tipoCuentaOptional= tipoCuentaRepository.findById(cuenta.getTipoCuenta().getId());
        if(!tipoCuentaOptional.isPresent()) {
        	return ResponseEntity.unprocessableEntity().build();
        }
        Optional<Cuenta> cuentaOptional = cuentaRepository.findById(id);
        if(!cuentaOptional.isPresent()) {
        	return ResponseEntity.unprocessableEntity().build();
        }
        cuenta.setCorreo(cuenta.getCorreo());
        cuenta.setEstado(cuenta.getEstado());
        cuenta.setId(cuentaOptional.get().getId());
        cuentaRepository.save(cuenta);

        return ResponseEntity.ok(cuenta);
    }

	
    @DeleteMapping("/{id}")
    public ResponseEntity<Cuenta> deleteCuenta(@PathVariable Long id) {
        cuentaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    
}