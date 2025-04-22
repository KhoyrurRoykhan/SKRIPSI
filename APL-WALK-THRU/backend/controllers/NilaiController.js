import Users from "../models/UserModel.js";
import Nilai from "../models/NilaiModel.js";

// Ambil semua nilai siswa (bisa include data user juga)
export const getAllNilaiSiswa = async (req, res) => {
  try {
    const nilai = await Nilai.findAll({
      include: [{
        model: Users,
        attributes: ['id', 'nama', 'nisn', 'token_kelas']
      }]
    });
    res.json(nilai);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Gagal mengambil data nilai siswa" });
  }
};

// Ambil nilai siswa berdasarkan token_kelas
export const getNilaiByTokenKelas = async (req, res) => {
  const { token_kelas } = req.query;
  try {
    const nilai = await Nilai.findAll({
      include: [{
        model: Users,
        where: { token_kelas },
        attributes: ['id', 'nama', 'nisn', 'token_kelas']
      }]
    });
    res.json(nilai);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Gagal mengambil data nilai berdasarkan token kelas" });
  }
};

// Ambil nilai kuis tertentu saja
export const getNilaiByKuis = async (req, res) => {
  const { kuis } = req.query; // contoh: kuis=kuis_1
  if (!kuis || !/^kuis_[1-6]$/.test(kuis)) {
    return res.status(400).json({ msg: "Kolom kuis tidak valid" });
  }

  try {
    const nilai = await Nilai.findAll({
      attributes: ['id', [kuis, 'nilai']],
      include: [{
        model: Users,
        attributes: ['id', 'nama', 'nisn', 'token_kelas']
      }]
    });

    res.json(nilai);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Gagal mengambil nilai berdasarkan kuis" });
  }
};
