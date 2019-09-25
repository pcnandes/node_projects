package br.com.condominio.condominio.domain;

import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.Builder;
import lombok.Getter;

@Embeddable
@Getter @Builder
public class UsuarioCondominioPK implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long idCondominio;
	private Long idFuncionario;
	
}
