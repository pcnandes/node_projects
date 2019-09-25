package br.com.condominio.condominio.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Builder;
import lombok.Getter;

@Entity
@Getter @Builder
public class Unidade {

	@Id
	private Long id;
	private String nome;
	private String andar;
	@ManyToOne
	private Bloco bloco;
	@ManyToOne
	private Usuario usuario;
}
