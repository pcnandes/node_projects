package br.com.condominio.condominio.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.condominio.condominio.domain.Usuario;
import br.com.condominio.condominio.repository.UsuarioRepository;

@RestController
public class UsuarioResource {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@RequestMapping(value = "/usuarios", method = RequestMethod.GET)
	public ResponseEntity<List<Usuario>> listar() {
		return new ResponseEntity<List<Usuario>>(usuarioRepository.findAll(), HttpStatus.OK);
	}

}
