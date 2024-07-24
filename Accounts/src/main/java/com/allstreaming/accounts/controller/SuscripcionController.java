package com.allstreaming.accounts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.allstreaming.accounts.model.Suscripcion;
import com.allstreaming.accounts.repository.SuscripcionRepository;
import com.allstreaming.accounts.service.SuscripcionService;

@CrossOrigin
@RestController
@RequestMapping("/suscripcion")
public class SuscripcionController {
	
	@Autowired
	private SuscripcionRepository suscripcionRepository;
	
	@Autowired
	private SuscripcionService suscripcionService;
	
	@GetMapping("")
	public List<Suscripcion> getSuscripciones(){
		return suscripcionRepository.findAll();
	}
	
	@PostMapping("/nueva")
	public Suscripcion createSuscripcion(@RequestBody Suscripcion suscripcion) {
		System.out.println(suscripcion.getCuenta());
		System.out.println(suscripcion.getTipoCuenta());
		return suscripcionRepository.save(suscripcion);
	}
	 @PutMapping("/actualizarEstado/{suscripcion_id}/{estado}")
	    public int updateSubscription(@PathVariable Long suscripcion_id,
	    		@PathVariable String estado) {
		
	    	return suscripcionService.updateEstado(suscripcion_id, estado);
	    }
}
