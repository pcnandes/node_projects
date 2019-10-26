package br.com.condominio.condominio.model;

import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
public class UsuarioCondominio {

	@EmbeddedId
	private UsuarioCondominioPK id;
	
	private Date dataInicioMandato;
	private Date dataTerminoMandato;
}
