package br.com.condominio.condominio.domain;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class UsuarioCondominio {

	private UsuarioCondominioPK id;
	private Date dataInicioMandato;
	private Date dataFinalMandato;
}
