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
import com.allstreaming.accounts.repository.TipoCuentaRepository;

@RestController
@RequestMapping("/tipocuenta")
public class TipoCuentaController {

	@Autowired
	private TipoCuentaRepository tipoCuentaRepository;
	
	public TipoCuentaController (TipoCuentaRepository tipoCuentaRepository) {
		this.tipoCuentaRepository= tipoCuentaRepository;
	}
	
	@GetMapping
	public List<TipoCuenta> getTiposCuenta(){
		return tipoCuentaRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public TipoCuenta getTipoCuenta(@PathVariable Long id) {
		return tipoCuentaRepository.findById(id).orElseThrow(RuntimeException::new);
	}
	
	@PostMapping
    public ResponseEntity<TipoCuenta> createTipoCuenta(@RequestBody TipoCuenta tipoCuenta) throws URISyntaxException {
        TipoCuenta savedTipo = tipoCuentaRepository.save(tipoCuenta);
        return ResponseEntity.created(new URI("/tiposCuenta/" + savedTipo.getId())).body(savedTipo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoCuenta> updateTipoCuenta(@PathVariable Long id, @RequestBody TipoCuenta tipoCuenta) {
    	Optional<TipoCuenta> tipoCuentaOptional = tipoCuentaRepository.findById(id);
        if(!tipoCuentaOptional.isPresent()) {
        	return ResponseEntity.unprocessableEntity().build();
        }
        tipoCuenta.setNombre(tipoCuenta.getNombre());
        
        tipoCuenta = tipoCuentaRepository.save(tipoCuenta);

        return ResponseEntity.ok(tipoCuenta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TipoCuenta> deleteTipoCuenta(@PathVariable Long id) {
        tipoCuentaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
	
}
