package br.com.condominio.condominio.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.condominio.condominio.domain.Usuario;
import br.com.condominio.condominio.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService  {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public Optional<Usuario> buscarPorEmail(String email) {
		return Optional.ofNullable(this.usuarioRepository.findByEmail(email));
	}
	
	public void validarUsuarioBuscadoAlteracao(Optional<Usuario> usuarioBuscado) {
		if(usuarioBuscado == null || usuarioBuscado.get() == null) {
			throw new IllegalArgumentException();
		}
	}
	
}
