package br.com.condominio.condominio.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Builder;
import lombok.Getter;

@Entity
@Getter @Builder
public class Bloco {

	@Id
	private Long id;
	private String nome;
	@ManyToOne
	private Condominio condominio;
}
