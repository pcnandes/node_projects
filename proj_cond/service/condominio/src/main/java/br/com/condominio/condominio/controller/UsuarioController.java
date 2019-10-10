package br.com.condominio.condominio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.condominio.condominio.domain.Usuario;
import br.com.condominio.condominio.repository.UsuarioRepository;

@RestController
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@GetMapping(path = "usuarios")
	public ResponseEntity<List<Usuario>> listar() {
		return new ResponseEntity<List<Usuario>>(usuarioRepository.findAll(), HttpStatus.OK);
	}

	@PostMapping(path = "usuario", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> incluir(@RequestBody Usuario usuario) {
		Usuario usuarioSalvo = usuarioRepository.save(usuario);
		return new ResponseEntity<Usuario>(usuarioSalvo, HttpStatus.OK);
	}

	@DeleteMapping(path = "usuario/{id}")
	public HttpStatus deletar(@PathVariable Long id) {
		usuarioRepository.deleteById(id);
		return HttpStatus.OK;
	}

	@PutMapping(path = "usuario/{id}")
	public ResponseEntity<Usuario> alterar(@PathVariable Long id, @RequestBody Usuario usuario) {
		Optional<Usuario> usuarioBuscado = usuarioRepository.findById(id);
		// TODO tratar a nao existencia do usuarioBuscado
		Usuario usuarioParaAtualizar = Usuario.builder().id(id).celular1(usuario.getCelular1())
				.celular2(usuario.getCelular2()).cpf(usuario.getCpf()).email(usuario.getEmail()).nome(usuario.getNome())
				.senha(usuario.getSenha()).telefone(usuario.getTelefone()).build();
		usuarioRepository.save(usuarioParaAtualizar);
		return new ResponseEntity<Usuario>(usuarioBuscado.get(), HttpStatus.OK);
	}

}
