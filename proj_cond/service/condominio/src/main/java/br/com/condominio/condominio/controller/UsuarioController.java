package br.com.condominio.condominio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.condominio.condominio.dto.ResponseDTO;
import br.com.condominio.condominio.dto.UsuarioDTO;
import br.com.condominio.condominio.service.UsuarioServiceImpl;

@RestController
public class UsuarioController {

	@Autowired
	private UsuarioServiceImpl usuarioService;
	
	@PreAuthorize("hasAnyRole('ADMIN')")
	@GetMapping(value = "/usuarios")
	public ResponseEntity<ResponseDTO<List<UsuarioDTO>>> listar() {
		ResponseDTO<List<UsuarioDTO>> response = new ResponseDTO<List<UsuarioDTO>>();
		response.setData(usuarioService.listar());
		return ResponseEntity.ok(response);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN')")
	@GetMapping(value = "/usuario/{id}")
	public ResponseEntity<ResponseDTO<UsuarioDTO>> buscar(@PathVariable Long id) {
		ResponseDTO<UsuarioDTO> response = new ResponseDTO<UsuarioDTO>();
		response.setData(usuarioService.buscar(id));
		return ResponseEntity.ok(response);
	}

	@PreAuthorize("hasAnyRole('ADMIN')")
	@PostMapping(value = "/usuario", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseDTO<UsuarioDTO>> incluir(@RequestBody UsuarioDTO usuarioDTO) {
		ResponseDTO<UsuarioDTO> response = new ResponseDTO<UsuarioDTO>();
		response.setData(usuarioService.salvar(usuarioDTO));
		return ResponseEntity.ok(response);
	}

	@PreAuthorize("hasAnyRole('ADMIN')")
	@DeleteMapping(value = "/usuario/{id}")
	public HttpStatus deletar(@PathVariable Long id) {
		usuarioService.deletar(id);;
		return HttpStatus.OK;
	}

	@PreAuthorize("hasAnyRole('ADMIN')")
	@PutMapping(value = "/usuario/{id}")
	public ResponseEntity<ResponseDTO<UsuarioDTO>> alterar(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {
		ResponseDTO<UsuarioDTO> response = new ResponseDTO<UsuarioDTO>();
		response.setData(usuarioDTO);
		try {
			usuarioService.alterar(id, usuarioDTO);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<ResponseDTO<UsuarioDTO>>(response, HttpStatus.UNPROCESSABLE_ENTITY);
		}
		return ResponseEntity.ok(response);
	}
}
