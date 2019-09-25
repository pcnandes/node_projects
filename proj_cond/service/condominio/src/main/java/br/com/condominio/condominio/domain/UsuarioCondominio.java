package br.com.condominio.condominio.domain;

import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import lombok.Builder;
import lombok.Getter;

@Entity
@Getter @Builder
public class UsuarioCondominio {

	@EmbeddedId
	private UsuarioCondominioPK id;
	
	private Date dataInicioMandato;
	private Date dataTerminoMandato;
}
