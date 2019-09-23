package br.com.condominio.condominio.domain;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class UsuarioCondominioPK {

	private Condominio condominio;
	private Usuario usuario;
	
}
