package br.com.condominio.security.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.condominio.condominio.model.Usuario;
import br.com.condominio.condominio.service.UsuarioService;
import br.com.condominio.security.JwtUserFactory;

@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UsuarioService usuarioService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario funcionario = usuarioService.buscarUsuarioPorEmail(username);

		if (funcionario != null) {
			return JwtUserFactory.create(funcionario);
		}

		throw new UsernameNotFoundException("Email não encontrado.");
	}

}
