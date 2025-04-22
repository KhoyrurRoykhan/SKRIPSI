import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import {
  BsGrid, BsPeople, BsBook, BsLightning, BsBarChart, BsPencilSquare, BsTrash, BsX, BsSave
} from 'react-icons/bs';
import Swal from 'sweetalert2';


const menuItems = [
  { name: 'Dashboard', icon: <BsGrid />, path: '/guru/dashboard' },
  { name: 'Data Siswa', icon: <BsPeople />, path: '/guru/datasiswa' },
  { name: 'Progres Belajar', icon: <BsBook />, path: '/guru/progres-belajar' },
  { name: 'Progres Tantangan', icon: <BsLightning />, path: '/guru/progres-tantangan' },
  { name: 'Data Nilai', icon: <BsBarChart />, path: '/guru/data-nilai' },
];

const DataSiswa = () => {
  const [activeMenu] = useState('Data Siswa');
  const location = useLocation();
  const navigate = useNavigate();
  const [dataSiswa, setDataSiswa] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [token, setTokenKelas] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState({ nisn: '', nama: '' });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Yakin hapus?',
      text: 'Data akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        Swal.fire('Dihapus!', 'Data siswa telah dihapus.', 'success');
        getUsers();
      } catch (error) {
        Swal.fire("Gagal", error.response?.data?.msg || "Terjadi kesalahan", "error");
      }
    }
  };

  const filteredSiswa = dataSiswa.filter((siswa) =>
    siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token-guru');
      const decoded = jwtDecode(response.data.accessToken);
      const tokenKelas = decoded.token;
      setTokenKelas(tokenKelas);

      const siswaRes = await axios.get(`http://localhost:5000/users/by-token?token_kelas=${tokenKelas}`);
      setDataSiswa(siswaRes.data);
    } catch (error) {
      console.log(error);
      if (error.response) {
        navigate('/login-guru');
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (siswa) => {
    setSelectedSiswa(siswa);
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSiswa((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${selectedSiswa.id}`, {
        nama: selectedSiswa.nama,
        nisn: selectedSiswa.nisn
      });
      Swal.fire("Sukses", "Data siswa berhasil diperbarui", "success");
      setShowModal(false);
      getUsers();
    } catch (error) {
      Swal.fire("Gagal", error.response?.data?.msg || "Terjadi kesalahan", "error");
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          height: '100vh',
          backgroundColor: '#212529',
          color: 'white',
          padding: '20px',
          position: 'fixed',
          left: 0,
          top: 0,
        }}
      >
        <h5 className="mb-4 text-center" style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold', marginTop: 65 }}>
          DAFTAR MENU
        </h5>
        <div className="sidebar-menu">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span style={{ marginRight: '10px' }}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '250px', padding: '30px', width: '100%', marginTop: 50 }}>
        <h2 className='mb-4'>{activeMenu}</h2>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Cari berdasarkan nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        <Table striped bordered hover responsive>
        <thead>
        <tr>
          <th style={{ width: '5%' }}>No</th>
          <th style={{ width: '20%' }}>NISN</th>
          <th style={{ width: '60%' }}>Nama</th>
          <th style={{ width: '15%' }}>Aksi</th>
        </tr>
      </thead>
          <tbody>
            {filteredSiswa.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">Data tidak ditemukan.</td>
              </tr>
            ) : (
              filteredSiswa.map((siswa, index) => (
                <tr key={siswa.id}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td>{siswa.nisn}</td>
                  <td>{siswa.nama}</td>
                  <td className="text-center">
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(siswa)}
                  >
                    <BsPencilSquare className="me-1" />
                    Edit
                  </Button>

                  <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                    <BsTrash className="me-1" />
                    Hapus
                  </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* Modal Edit */}
        {showModal && (
          <div className="modal show fade" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Data Siswa</h5>
                  <button type="button" className="btn-close" onClick={handleModalClose}></button>
                </div>
                <div className="modal-body">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>NISN</Form.Label>
                      <Form.Control
                        type="text"
                        name="nisn"
                        value={selectedSiswa.nisn}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        type="text"
                        name="nama"
                        value={selectedSiswa.nama}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                </div>
                <div className="modal-footer">
                <Button variant="secondary" onClick={handleModalClose}>
                  <BsX className="me-1" />
                  Batal
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                  <BsSave className="me-1" />
                  Simpan
                </Button>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar styles */}
      <style>{`
        .sidebar-menu {
          display: flex;
          flex-direction: column;
        }
        .sidebar-item {
          padding: 12px 15px;
          margin-bottom: 8px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 16px;
          transition: background-color 0.2s ease;
        }
        .sidebar-item:hover {
          background-color: #343a40;
        }
        .sidebar-item.active {
          background-color: #0d6efd;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default DataSiswa;
