package br.com.condominio.condominio.service;

import java.util.Optional;

import br.com.condominio.condominio.domain.Usuario;

public interface UsuarioService {

	/**
	 * Busca e retorna um usuário dado um email.
	 * 
	 * @param email
	 * @return Optional<Usuario>
	 */
	Optional<Usuario> buscarPorEmail(String email);
	
	public void validarUsuarioBuscadoAlteracao(Optional<Usuario> usuarioBuscado);

}
