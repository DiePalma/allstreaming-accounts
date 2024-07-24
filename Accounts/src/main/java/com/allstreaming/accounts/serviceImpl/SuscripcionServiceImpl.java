package com.allstreaming.accounts.serviceImpl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.allstreaming.accounts.repository.SuscripcionRepository;
import com.allstreaming.accounts.service.SuscripcionService;

@Service
public class SuscripcionServiceImpl implements SuscripcionService{

	@Autowired
	private SuscripcionRepository suscripcionRepository;
	
	@Override
	public int updateEstado(Long suscripcion_id, String estado) {
		return suscripcionRepository.updateEstado(suscripcion_id, estado);
	}
	
	
}
